import { Router } from "express";
import { UserRequest } from "../types/types";
//type for the request TODO make this into a type file

const userRouter = Router();

userRouter.get("/", (req: UserRequest, res) => {});
userRouter.post("/", (req, res) => {});
userRouter.put("/", (req, res) => {});
userRouter.delete("/", (req, res) => {});

export default userRouter;
