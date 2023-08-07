const mongoose = require("../managers/mongodb.js");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
});


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
