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
  orderItems: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
        required: true,
      },
      productTotal: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = Orders = mongoose.model("orders", AdminOrderSchema);
