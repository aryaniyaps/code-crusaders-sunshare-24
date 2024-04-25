import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import kratos from "../lib/kratos.js";

export default async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const { data } = await kratos.toSession({ cookie: req.header("cookie") });
    // set user Id on the request
    req.userId = data.identity?.id;
    return next();
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return next(createHttpError(401, "Unauthorized!"));
      }
    }
    return next(createHttpError(500, "Internal server error!"));
  }
}
