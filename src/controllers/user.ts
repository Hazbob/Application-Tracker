import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

//this will be a handler for a route
export const createNewUser = async function (req, res) {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  return res.status(201).json({ token });
};

export const signin = async function (req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Not Authorised" });
  }

  const token = createJWT(user);
  res.json({ token });
};
