const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  cover: String,
  description: String,
  cookingTime: String,
  ingredients: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
