import * as dotenv from "dotenv";
dotenv.config({
  path: "/Users/harryrobinson/Desktop/projects/application-tracker/Application-Tracker/.env.test",
});
import app from "./server";
const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
