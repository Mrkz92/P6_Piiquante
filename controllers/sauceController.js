const { json } = require("express");
const { HttpStatus } = require("../managers/httpstatus.js");
const Sauce = require("../models/sauce");

exports.createSauce = async (req, res, next) => {
  delete req.body._id;
  const { userId, name, manufacturer, description, mainPepper, imageUrl, heat } = req.body;
  const sauce = new Sauce({ userId, name, manufacturer, description, mainPepper, imageUrl, heat });
  // const sauce = new Sauce({
  //   userId: req.body.userId,
  //   name: req.body.name,
  //   manufacturer: req.body.manufacturer,
  //   description: req.body.description,
  //   mainPepper: req.body.mainPepper,
  //   imageUrl: req.body.imageUrl,
  //   heat: req.body.heat,
  // });
  console.log("Nouvelle sauce", sauce.name);
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
  throw new HttpStatus(200, json(sauce));
};

exports.getAllSauces = async (req, res, next) => {
  const sauces = await Sauce.find();
  throw new HttpStatus(200, json(sauces));
};
