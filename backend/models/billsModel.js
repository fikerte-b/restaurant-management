const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
    {
        userId: String,
        customerName: String,
        email: String,
        phoneNumber: String,
        status: {
            type: String,
            enum : ['Cancel','Done'],
            default: 'Done'
        },
        orderedMeals: [
          {
            category: String,
            mealName: String,
            price: Number,
            quantity: Number,
            total: Number,
          }
        ],
        totalAmount: Number
      },
      { timestamps: true }
);
module.exports = mongoose.model("Bill", billSchema);