import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cors from "cors";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import dotenv from "dotenv";
import { schema } from "./schema";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";
import { createContext } from "./context";

dotenv.config();

//declaration merge to inject userId into express session object
declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const redisClient = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });
  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => {
    httpServer.listen(PORT);
    resolve();
  });

  console.log(
    `Express server running at http://localhost:${PORT}. Apollo server running at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

startServer().catch((err) => console.log("Error starting server", err));
