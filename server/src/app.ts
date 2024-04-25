import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";

// add support for async handlers
import "express-async-errors";

import cookieParser from "cookie-parser";
import { env } from "./env.js";
import consumerRouter from "./routers/consumer.js";
import providerRouter from "./routers/provider.js";
import testRouter from "./routers/test.js";

export default function createApp(): Express {
  const app = express();
  registerMiddleware(app);
  registerRoutes(app);
  return app;
}

function registerMiddleware(app: Express): void {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: env.CORS_ORIGIN_URL,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Accept"],
    })
  );
}

function registerRoutes(app: Express): void {
  app.use("/test", testRouter);
  app.use("/providers", providerRouter);
  app.use("/consumers", consumerRouter);
}
