const path = require("path");
const fs = require("fs");

module.exports = (env) => {
  // 创建环境变量
  let dotenvFiles = [];

  switch (env) {
    case "development":
      dotenvFiles.push(path.resolve(".env.development"));
      break;
    case "production":
      dotenvFiles.push(path.resolve(".env.production"));
      break;
    case "uat":
      dotenvFiles.push(path.resolve(".env.uat"));
      break;
    default:
      break;
  }
  dotenvFiles.push(path.resolve(".env"));
  dotenvFiles = dotenvFiles.filter(Boolean);

  dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      require("dotenv-expand")(
        require("dotenv").config({
          path: dotenvFile,
        })
      );
    }
  });

  const BYHEALTH_ENV = /^BY_HEALTH/i;

  const raw = Object.keys(process.env)
    .filter((key) => BYHEALTH_ENV.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: (env || "development"),
        PUBLIC_PATH: (process.env.PUBLIC_PATH ?  `${process.env.PUBLIC_PATH}/` : './')
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
};
