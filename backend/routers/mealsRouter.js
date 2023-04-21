const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealsController");

router.get("/", mealController.getAllMeals);
router.post("/add", mealController.addMeal);

router.get("/category/:category", mealController.getMealByCategory);
router.get("/:meal_id", mealController.getMealById);

router.patch("/:meal_id/update", mealController.updateMealById);
router.delete("/:meal_id/delete", mealController.deleteMeal);

module.exports = router;
