const { DataTypes } = require("sequelize");
const mariadb = require("../managers/mariadb.js");

const Product = mariadb.define("Product", {
  userId: { type: DataTypes.STRING, allowNull: false },
  reference: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  binding: { type: DataTypes.STRING, allowNull: false },
  condition: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  keywords: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// Synchroniser le modèle avec la base de données (c'est-à-dire créer la table si elle n'existe pas)
Product.sync();

module.exports = Product;
