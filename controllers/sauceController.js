const { json } = require("express");
const { HttpStatus } = require("../managers/httpstatus.js");
const Sauce = require("../models/sauce");
let { HTTP_PORT = 3000 } = require("../managers/env.js");

exports.createSauce = async (req, res, next) => {
  delete req.body._id;
  console.log(req.files.image[0]);
  // Todo: Vérifier userId == req.auth.userId
  const body = JSON.parse(req.body.sauce);
  body.imageUrl = `${req.protocol}://${req.hostname}:${HTTP_PORT}/images/${req.files.image[0].filename}`;
  const sauce = new Sauce(body);
  await sauce.save();
  throw new HttpStatus(201, { message: "Nouvelle sauce enregistrée !" });
};

exports.modifySauce = async (req, res, next) => {
  const sauce = await Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
  throw new HttpStatus(200, { message: "La sauce a été modifiée" });
};

exports.deleteSauce = async (req, res, next) => {
  const sauce = await Sauce.deleteOne({ _id: req.params.id });
  throw new HttpStatus(200, { message: "La sauce a bien été supprimée!" });
};

// exports.likeSauce = async (req, res, next) => {
//   const sauce = Sauce.updateOne
// }

exports.getOneSauce = async (req, res, next) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  throw new HttpStatus(200, sauce);
};

exports.getAllSauces = async (req, res, next) => {
  const sauces = await Sauce.find();
  throw new HttpStatus(200, sauces);
};
