import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

// input type used to pass options to resolver functions
@InputType()
class UsernamePasswordInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

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

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  //get current logged-in user
  async me(@Ctx() { em, req }: MyContext) {
    // use user id to check if session exists (does the user have a cooki?)
    if (!req.session.userId) {
      return null;
    }

    // if yes, find and return that user
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  // register a user
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    // check if username is long enough
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be longer",
          },
        ],
      };
    }

    // check if password is long enough
    if (options.password.length <= 6) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be longer",
          },
        ],
      };
    }

    // hash password to be stored in db
    const hashedPassword = await argon2.hash(options.password);
    // create user to be added to db
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    // try to persist user to db
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        // duplicate username
        return {
          errors: [
            {
              field: "username",
              message: "username already exists",
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
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    // try to find user from db
    const user = await em.findOne(User, { username: options.username });
    // return error if user doesn't exist
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }
    // verify is password is correct
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    // assign cookie to user once login is successful
    req.session!.userId = user.id;

    return { user };
  }
}
