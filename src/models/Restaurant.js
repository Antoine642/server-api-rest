const mongoose = require("mongoose");
const User = require("../models/User");
const Plate = require("../models/Plate");

const RestaurantSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        plates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Plate,
                required: true,
            },
        ],
    }
);

RestaurantSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        address: this.address,
        postalCode: this.postalCode,
        city: this.city,
        user: this.user_id,
        plates: this.plates,
    };
};

module.exports = mongoose.model("Restaurant", RestaurantSchema);
