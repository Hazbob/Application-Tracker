import { Router } from "express";
import userRouter from "./userRouter";
import applicationRouter from "./applicationRouter";
import app from "../server";
const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/app", applicationRouter);
export default apiRouter;
