const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
  cookingTime: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: [
    {
      cover: String,
      description: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Recipe", recipeSchema);
