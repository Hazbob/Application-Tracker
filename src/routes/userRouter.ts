import { Router } from "express";
import { Request } from "express";
//type for the request TODO make this into a type file
export interface User {
  id: string;
  username: string;
  iat: number;
}
interface UserRequest extends Request {
  user?: User;
}

const userRouter = Router();

userRouter.get("/", (req: UserRequest, res) => {});
userRouter.post("/", (req, res) => {});
userRouter.put("/", (req, res) => {});
userRouter.delete("/", (req, res) => {});

export default userRouter;
