import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/apiRouter";
import { protect } from "./utils/auth";
import { createNewUser, signin } from "./controllers/user";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, apiRouter);

app.post("/signup", createNewUser);
app.post("/signin", signin);

app.use("/*", (error, req, res, next) => {
  if (error.message === "Error adding new application") {
    res.status(400).send({ message: "Bad Request" });
  }
  if (error.message === "No Applications Found!") {
    res.status(404).send({ message: error.message });
  } else {
    console.error(error);
  }
});
export default app;
