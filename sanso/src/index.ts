import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";

// use declaration merging to add 'userId' to session object
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "strobo2",
    username: "postgres",
    password: "Niccolo1!",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  const app = express();

  const RedisStore = connectRedis(session); // create RedisStore
  const redis = new Redis(); // connects to redis-server

  app.use(
    // allow app to use cors from
    cors({
      origin: "http://localhost:3000", // this URL
      credentials: true,
    })
  );
  app.use(
    // set up cookies to be used by apollo and express as middleware
    session({
      name: COOKIE_NAME, // The name of the session ID cookie to set in the response (and read from in the request)
      // The session store instance
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      // Settings object for the session ID cookie
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 1o years
        httpOnly: true,
        sameSite: "lax", // csrf
        // secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "abcdefghijklmnopqrstuvwxyz",
      resave: false,
    })
  );

  // start apollo server instance
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver], // add resolvers to schema
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }), // add contexxt for resolvers
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
};

main().catch((err) => {
  console.log(err);
});
