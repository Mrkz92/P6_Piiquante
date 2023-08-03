const { HttpStatus } = require("../managers/httpstatus.js");
const jwtManager = require("../managers/jwt.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new HttpStatus(401, { message: "Token missing" });
    const { userId } = jwtManager.verify(token);
    req.auth = { userId };
    next();
  } catch (error) {
    throw new HttpStatus(401, { message: "Invalid request !" });
  }
};
