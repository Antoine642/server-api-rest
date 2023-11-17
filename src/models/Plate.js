const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

const PlateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  { timestamps: true }
);

PlateSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    image: this.image,
    price: this.price,
    restaurant_id: this.restaurant_id,
  };
};

module.exports = mongoose.model("Plate", PlateSchema);
