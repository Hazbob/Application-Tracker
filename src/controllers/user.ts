import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

//this will be a handler for a route
export const createNewUser = async function (req, res) {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password), //can awwait on a property like that but probably shouldnt, but in this case doesnt matter
    },
  });
  const token = createJWT(user);
  res.status(201).json({ token });
};

export const signin = async function (req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401).json({ message: "Not Authorised" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
