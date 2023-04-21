const Meal = require("../models/mealsModel");
const { ObjectId } = require("mongodb");


module.exports.addMeal = async (req, res, next) => {
  try {
    const meal = req.body;
    const result = await Meal.create(meal);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.getAllMeals = async (req, res, next) => {
  try {
    const result = await Meal.find();
    res.json({ success: true, data: result });
    console.log(result, "all meals controller");
  } catch (e) {
    next(e);
  }
};

module.exports.getMealById = async (req, res, next) => {
  try {
    const meal_id = ObjectId(req.params.meal_id);
    const result = await Meal.findOne({ _id: meal_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

//get meals by category
module.exports.getMealByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const result = await Meal.find({ category: category });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
module.exports.updateMealById = async (req, res, next) => {
  try {
    const { category, name, price, ingredients } = req.body;
    const meal_id = ObjectId(req.params.meal_id);
    const result = await Meal.updateOne(
      { _id: meal_id },
      { $set: { category, name, price, ingredients } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteMeal = async (req, res, next) => {
  try {
    const meal_id = ObjectId(req.params.meal_id);
    const result = await Meal.deleteOne({ _id: meal_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
