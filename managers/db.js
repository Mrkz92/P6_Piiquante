const mongoose = require("mongoose");

const MONGO_DB = mongoose
  .connect("mongodb+srv://MarekZ:wEUaqs4MsT9O9s5k@cluster1.gr2dxmh.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = MONGO_DB;
