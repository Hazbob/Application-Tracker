import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development"; //this makes sure to not overwrite NODE_ENV if it already existed
const stage = process.env.STAGE || "local";

let envConfig;
/*
 * so now if we set the stage before we run the app to be any of these stages
 * it will run a different config, and set that to env config
 * this envConfig then overWrites the default config we set below, by using
 * lodash merge
 * */
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "test") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig,
);
