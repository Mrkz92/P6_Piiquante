const { json } = require("express");
const { HttpStatus } = require("../managers/httpstatus.js");
const Sauce = require("../models/sauce.js");

exports.likeSauce = async (req, res, next) => {
  const { like, userId } = req.body;
  const { _id } = req.params;
  if (userId != req.auth.userId) throw new HttpStatus(401, { message: "User id non valable !" });
  const sauce = await Sauce.findById(_id);
  const hasLiked = sauce.usersLiked.includes(userId);
  const hasDisliked = sauce.usersDisliked.includes(userId);
  if (hasLiked && like !== 1) remove(sauce.usersLiked, userId);
  if (hasDisliked && like !== -1) remove(sauce.usersDisliked, userId);
  if (!hasLiked && like === 1) sauce.usersLiked.push(userId);
  if (!hasDisliked && like === -1) sauce.usersDisliked.push(userId);
  sauce.likes = sauce.usersLiked.length;
  sauce.dislikes = sauce.usersDisliked.length;
  await sauce.save();
  throw new HttpStatus(200, { message: "Votre choix a bien été enregistré" });
};
function remove(array, userId) {
  array.splice(array.indexOf(userId), 1);
}
