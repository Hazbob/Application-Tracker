import * as dotenv from "dotenv";
import config from "./config";
dotenv.config({
  path: "/Users/harryrobinson/Desktop/projects/application-tracker/Application-Tracker/.env.test",
});
import app from "./server";

app.listen(config.port, () => {
  console.log("listening on port 3001");
});
