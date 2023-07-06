const mongoose = require("../managers/mongodb.js");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
