import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";

// error object used to handle errors
@ObjectType()
class FieldError {
  @Field() // returns where error ocurred
  field: string;
  @Field() // returns error message
  message: string;
}

// object used to handle responses -> outputs error or user
@ObjectType()
class UserResponse {
  //returns error usig FieldError
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  // retruns a user succesfully
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 6) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password must contain at least 6 characters",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token has expired",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "This user no longer exists",
          },
        ],
      };
    }

    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // email is not in db
      // return true (to avoid brute force password phishing)
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3 // 3 days
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset your password</a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  //get current logged-in user
  me(@Ctx() { req }: MyContext) {
    // use user id to check if session exists (does the user have a cooki?)
    if (!req.session.userId) {
      return null;
    }

    // if yes, find and return that user
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  //get current logged-in user
  async user(@Arg("id", () => Int) id: number) {
    const data = await User.findOne(id, { relations: ["posts"] });
    console.log(data);
    return data;
  }

  @Mutation(() => UserResponse)
  // register a user
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    // hash password to be stored in db
    const hashedPassword = await argon2.hash(options.password);

    // try to persist user to db
    let user;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          password: hashedPassword,
          email: options.email,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        // duplicate username
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists",
            },
          ],
        };
      }
      console.log("message", err.message);
    }

    // once a user successfully registers assign them a cookie
    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  // login a user
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // try to find user from db
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    // return error if user doesn't exist
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Username doesn't exist",
          },
        ],
      };
    }
    // verify is password is correct
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    // assign cookie to user once login is successful
    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
