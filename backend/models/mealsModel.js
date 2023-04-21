const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    category: String,
    name: String,
    price: Number,
    ingredients: [String],
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Meal", mealSchema);