import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = function (password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = function (password) {
  return bcrypt.hash(password, 5);
};

export const createJWT = function (user) {
  const token = jwt.sign(
    { id: user.id, username: user.username }, //payload with unique user info
    process.env.JWT_SECRET, //secret string which is used for decoding
  );
  return token;
};

export const protect = function (req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send({ message: "Not authorised" });
    return;
  }

  const [_, token] = bearer.split(" ");
  if (!token) {
    res.status(401).send({ message: "Not authorised" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: "Not authorised" });
    return;
  }
};
