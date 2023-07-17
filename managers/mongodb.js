const mongoose = require("mongoose");
const { MONGODB_URL } = require("./env");

if (!MONGODB_URL) throw "MONGODB_URL must be set in .env.local";

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = mongoose;
