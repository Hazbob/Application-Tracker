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

export default app;
