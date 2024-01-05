import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/apiRouter";
import { protect } from "./utils/auth";
import { createNewUser, signin } from "./controllers/user";
import errorRouter from "./routes/errorRouter";
import cors from "cors";

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", protect, apiRouter);

app.post("/signup", createNewUser);
app.post("/signin", signin);

app.use("/*", errorRouter);
export default app;
