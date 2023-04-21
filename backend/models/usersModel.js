const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: { type : String , unique : true, required : true },
    phonenumber: String,
    password: { type : String , required : true },
    role: {
        type: String,
        enum : ['manager','employee'],
        default: 'employee'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
