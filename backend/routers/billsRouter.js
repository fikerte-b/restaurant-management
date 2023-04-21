const express = require("express");
const router = express.Router();
const billController = require("../controllers/billsController");

router.get("/:user_id", billController.getUserAllBills);
router.post("/:user_id/add", billController.addUserBill);
router.get("/:user_id/:bill_id", billController.getUserBillById);
router.patch("/:user_id/:bill_id/update", billController.updateUserBillById);
router.delete("/:user_id/:bill_id/delete", billController.deleteUserBill);

// router.post(
//   "/:user_id/:bill_id/orderedMeal/add",
//   billController.addUserOrderedMeal
// );
router.get(
  "/:user_id/:bill_id/orderedMeal/:orderedMeal_id",
  billController.getOrderedMealById
);
router.patch(
  "/:user_id/:bill_id/orderedMeal/:orderedMeal_id/update",
  billController.updateOrderedMeal
);
router.delete(
  "/:user_id/:bill_id/orderedMeal/:orderedMeal_id/delete",
  billController.deleteOrderedMeal
);

//for stripe payment method
router.post("/create_checkout_session", billController.createCheckoutSession);

module.exports = router;
