const fs = require("fs");
const { json } = require("express");
const { HTTP_PORT = 3000 } = require("../managers/env.js");
const { HttpStatus } = require("../managers/httpstatus.js");
const Sauce = require("../models/sauce.js");

exports.createSauce = async (req, res, next) => {
  const body = JSON.parse(req.body.sauce);
  delete body._id;
  if (body.userId != req.auth.userId) throw new HttpStatus(401, { message: "User id non valable !" });
  body.imageUrl = `${req.protocol}://${req.hostname}:${HTTP_PORT}/images/${req.files.image[0].filename}`;
  const sauce = new Sauce(body);
  await sauce.save();
  throw new HttpStatus(201, { message: "Nouvelle sauce enregistrée !" });
};

exports.readSauce = async (req, res, next) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  throw new HttpStatus(200, sauce);
};

exports.updateSauce = async (req, res, next) => {
  const body = req.file ? { ...JSON.parse(req.body.sauce), imageUrl: getImageUrl(req) } : req.body;
  const { _id } = req.params;
  delete body._userId;
  delete body._id;

  if (body.userId != req.auth.userId) throw new HttpStatus(403, { message: "Unauthorized request." });
  await Sauce.updateOne({ _id: req.params.id }, body);
  throw new HttpStatus(200, { message: " Sauce modifiée !" });
};

exports.deleteSauce = async (req, res, next) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  if (sauce.userId != req.auth.userId) throw new HttpStatus(401, { message: "User id non authorisé !" });
  const filename = sauce.imageUrl.split("/images/")[1];
  await fs.promises.unlink(`images/${filename}`);
  await Sauce.deleteOne({ _id: req.params.id });
  throw new HttpStatus(200, { message: "La sauce a bien été supprimée!" });
};

exports.listSauces = async (req, res, next) => {
  const sauces = await Sauce.find();
  throw new HttpStatus(200, sauces);
};

function getImageUrl(req) {
  return `${req.protocol}://${req.hostname}:${HTTP_PORT}/images/${req.files.image[0].filename}`;
}
