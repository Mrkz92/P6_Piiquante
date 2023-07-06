const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  console.log("Nouvelle sauce", sauce.name);
  sauce
    .save()
    .then((sauce) => res.status(201).json({ message: "Nouvelle sauce enregistrée !" }))
    .catch(sendStatus(400, "Problème survenu"));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ message: error }));
};
