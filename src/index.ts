import * as dotenv from "dotenv";
import app from "./server";
import config from "./config";
dotenv.config();

app.listen(config.port, () => {
  console.log("listening on port 3001");
});
