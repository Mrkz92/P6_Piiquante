const dotenv = require("dotenv");

const env = {
  ...dotenv.config({ path: ".env" }).parsed,
  ...dotenv.config({ path: ".env.local" }).parsed,
};

module.exports = env;
