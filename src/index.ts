import * as dotenv from "dotenv";
dotenv.config({
  path: "/Users/harryrobinson/Desktop/projects/application-tracker/Application-Tracker/.env.test",
});
import app from "./server";

app.listen(process.env.port, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
