const _jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("./env.js");

if (!JWT_SECRET) throw "JWT_SECRET must be set in .env.local";
if (!JWT_EXPIRE) throw "JWT_EXPIRE must be set in .env";

const jwt = {};
jwt.verify = (token) => _jwt.verify(token, JWT_SECRET);
jwt.sign = (data) => _jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });

module.exports = jwt;
