const mongoose = require("mongoose");
const User = require("../models/User");
const Plate = require("../models/Plate");
const Restaurant = require("../models/Restaurant");

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Restaurant,
            required: true,
        },
        items: [
            {
                plate_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: Plate,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            enum: ['PROCESSING', 'COMPLETED', 'CANCELED'],
            default: 'PROCESSING',
        },
    },
    { timestamps: true }
);

orderSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        user_id: this.user_id,
        restaurant_id: this.restaurant_id,
        items: this.items,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
