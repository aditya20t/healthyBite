const mongoose = require("mongoose");

const AdminOrderSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  amount:{
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  orderItems: [],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = AdminOrder = mongoose.model("adminOrder", AdminOrderSchema);
