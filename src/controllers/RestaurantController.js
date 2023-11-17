const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

class RestaurantController {
    static async getRestaurants(req, res) {
        res.send(await Restaurant.find().populate("user_id"));
    }
    static async getRestaurantById(req, res) {
        try {
            const restaurant = await Restaurant.findOne({ _id: req.params.id });
            if (!restaurant) {
                res.status(404).send({ error: "Restaurant not found" });
                return;
            }
            res.send(restaurant);
        } catch (e) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
    
    static async createRestaurant(req, res) {
        try {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: "RESTAURANT"
            });
            await user.save();
            const restaurant = new Restaurant({
                address: req.body.address,
                postalCode: req.body.postalCode,
                city: req.body.city,
                user_id: user._id,
            });
            await restaurant.save();
            res.send(restaurant);
        } catch (e) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    } 
}

module.exports = RestaurantController;
