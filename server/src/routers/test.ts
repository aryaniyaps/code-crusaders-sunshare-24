import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth.js";

const testRouter = Router();

testRouter.use(authMiddleware);

testRouter.get("/protected", function (req: Request, res: Response) {
  res.send("protected data");
});

export default testRouter;
