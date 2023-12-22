import { Router } from "express";
import { UserRequest } from "../types/types";
import errorRouter from "./errorRouter";

const userRouter = Router();

userRouter.get("/", (req: UserRequest, res) => {});
userRouter.post("/", (req, res) => {});
userRouter.put("/", (req, res) => {});
userRouter.delete("/", (req, res) => {});

userRouter.use(errorRouter);

export default userRouter;
