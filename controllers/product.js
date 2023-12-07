const fs = require("fs");
const { json } = require("express");
const { HTTP_PORT = 3000 } = require("../managers/env.js");
const { HttpStatus } = require("../managers/httpstatus.js");
const Product = require("../models/product.js");

exports.createProduct = async (req, res, next) => {
  const body = JSON.parse(req.body.Product);
  delete body._id;
  if (body.userId != req.auth.userId)
    throw new HttpStatus(401, { message: "User id non valable !" });
  body.imageUrl = `${req.protocol}://${req.hostname}:${HTTP_PORT}/images/${req.files.image[0].filename}`;
  const Product = new Product(body);
  await Product.save();
  throw new HttpStatus(201, { message: "Nouvelle Product enregistrée !" });
};

exports.readProduct = async (req, res, next) => {
  const Product = await Product.findOne({ _id: req.params.id });
  throw new HttpStatus(200, Product);
};

exports.updateProduct = async (req, res, next) => {
  const body = req.file
    ? { ...JSON.parse(req.body.Product), imageUrl: getImageUrl(req) }
    : req.body;
  const { _id } = req.params;
  delete body._userId;
  delete body._id;

  if (body.userId != req.auth.userId)
    throw new HttpStatus(403, { message: "Unauthorized request." });
  await Product.updateOne({ _id: req.params.id }, body);
  throw new HttpStatus(200, { message: " Product modifiée !" });
};

exports.deleteProduct = async (req, res, next) => {
  const Product = await Product.findOne({ _id: req.params.id });
  if (Product.userId != req.auth.userId)
    throw new HttpStatus(401, { message: "User id non authorisé !" });
  const filename = Product.imageUrl.split("/images/")[1];
  await fs.promises.unlink(`images/${filename}`);
  await Product.deleteOne({ _id: req.params.id });
  throw new HttpStatus(200, { message: "La produit a bien été supprimée!" });
};

exports.listProducts = async (req, res, next) => {
  const Products = await Product.find();
  throw new HttpStatus(200, Products);
};

function getImageUrl(req) {
  return `${req.protocol}://${req.hostname}:${HTTP_PORT}/images/${req.files.image[0].filename}`;
}
