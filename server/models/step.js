const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  number: Number,
  cover: String,
  description: String,
  recipeId: String,
});

module.exports = mongoose.model("Step", stepSchema);
