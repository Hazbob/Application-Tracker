import { Router } from "express";
import applicationRouter from "./applicationRouter";
const apiRouter = Router();

apiRouter.use("/app", applicationRouter);
export default apiRouter;
