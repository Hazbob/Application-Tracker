import { Request } from "express";

export interface User {
  id: string;
  username: string;
  iat: number;
}
export interface UserRequest extends Request {
  user?: User;
}

export interface ApplicationType {
  jobTitle: string;
  companyName: string;
  imageUrl: string;
  userId: string;
}
