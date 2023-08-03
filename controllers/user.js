const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwtManager = require("../managers/jwt.js");
const { HttpStatus } = require("../managers/httpstatus.js");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, hash });
  await user.save();
  throw new HttpStatus(201, { message: "Utilisateur créé !" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new HttpStatus(401, { message: "Paire login/mot de passe incorrecte" });

  const valid = await bcrypt.compare(password, user.hash);
  if (!valid) throw new HttpStatus(401, { message: "Paire login/mot de passe incorrecte" });

  const userId = user._id;
  throw new HttpStatus(200, { userId, token: jwtManager.sign({ userId }) });
};
