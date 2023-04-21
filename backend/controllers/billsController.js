const Bill = require("../models/billsModel");
const { ObjectId, CURSOR_FLAGS } = require("mongodb");
const stripe = require("stripe")(
  "sk_test_51MUE07LVvcHCyDgMM8BI2s6z8VNED6plEwE3v5EBlKMOW1r9VJcrSr87yjuITfFaf7Ijfpnsat5NwfYmuAtjm7qy00ooqApacR"
);

module.exports.getUserAllBills = async (req, res, next) => {
  try {
    const user_id = ObjectId(req.params.user_id);
    const result = await Bill.find({ userId: user_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.addUserBill = async (req, res, next) => {
  try {
    const user_id = ObjectId(req.params.user_id);
    const bill = req.body;
    bill.userId = user_id;
    const result = await Bill.create(bill);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.getUserBillById = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const result = await Bill.findOne({ _id: bill_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateUserBillById = async (req, res, next) => {
  try {
    const { userId, customerName, customerPhone, status } = req.body;
    const bill_id = ObjectId(req.params.bill_id);
    const result = await Bill.updateOne(
      { _id: bill_id },
      { $set: { userId, customerName, customerPhone, status } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteUserBill = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const result = await Bill.deleteOne({ _id: bill_id });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

//adding meal in bill
module.exports.addUserOrderedMeal = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const newOrderedMeal = { ...req.body, dateCreated: Date.now() };
    const result = await Bill.updateOne(
      { _id: bill_id },
      { $push: { orderedMeals: newOrderedMeal } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

//get a meal from a bill
module.exports.getOrderedMealById = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const orderedMeal_id = ObjectId(req.params.orderedMeal_id);
    const result = await Bill.aggregate([
      { $unwind: "$orderedMeals" },
      { $match: { _id: goal_id, "orderedMeals._id": orderedMeal_id } },
      {
        $project: {
          _id: "$orderedMeals._id",
          category: "$orderedMeals.category",
          price: "$orderedMeals.price",
          quantity: "$orderedMeals.quantity",
        },
      },
    ]);

    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateOrderedMeal = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const orderedMeal_id = ObjectId(req.params.orderedMeal_id);
    const orderedMeal = req.body;
    const result = await Bill.updateOne(
      { _id: bill_id, "orderedMeals._id": orderedMeal_id },
      { $set: { "orderedMeals.$": orderedMeal } }
    );
    res.json({ success: true, data: result });
    console.log(result);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteOrderedMeal = async (req, res, next) => {
  try {
    const bill_id = ObjectId(req.params.bill_id);
    const orderedMeal_id = ObjectId(req.query.orderedMeal_id);
    const result = await Bill.updateOne(
      { _id: bill_id },
      { $pull: { orderedMeals: { _id: orderedMeal_id } } }
    );
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

//for the stripe payment method
module.exports.createCheckoutSession = async (req, res, next) => {
  try {
    const orderedTotal = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Gursha Restaurant",
            },
            unit_amount: orderedTotal * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/fail",
    });
    res.json({ success: true, id: session.id });
  } catch (e) {
    next(e);
  }
};
