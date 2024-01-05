import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";
import app from "../server";
import errorRouter from "../routes/errorRouter";
export const createNewUser = async function (req, res) {
  if (!req.body.username || !req.body.password) {
    throw new Error("Missing username or password");
  }
  try {
    const existingUserCheck = await prisma.user.findFirst({
      where: { username: req.body.username },
    });
    if (existingUserCheck) {
      throw new Error("User already exists, try a different username");
    }
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);

    res.status(400).send({ message: err.message });
  }
};

export const signin = async function (req, res) {
  try {
    console.log("trying to login");
    if (!req.body.username || !req.body.password) {
      throw new Error("Missing username or password");
    }
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      throw new Error("Account doesn't exist");
    }

    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Not Authorised" });
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
