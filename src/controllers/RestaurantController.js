const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Hash = require("../utils/hash");

class RestaurantController {
    static async getRestaurants(req, res) {
        res.send(await Restaurant.find().populate("user_id"));
    }
    static async getRestaurantById(req, res) {
        try {
            const restaurant = await Restaurant.findOne({ user_id: req.user._id }).populate("user_id");
            if (!restaurant) {
                res.status(404).send({ error: "Restaurant not found" });
                return;
            }
            res.send(restaurant);
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: "Internal Server Error getRestaurantById" });
        }
    }
    
    static async createRestaurant(req, res) {
        try {
            const password = await Hash.hash(req.body.password);
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                password: password,
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
            res.status(500).send({ error: "Internal Server Error createResto" });
        }
    } 

    static async deleteRestaurant(req, res) {
        try {
            const restaurant = await Restaurant.findOne({ _id: req.params.id });
            if (!restaurant) {
                res.status(404).send({ error: "Restaurant not found" });
                return;
            }
            await User.deleteOne({ _id: restaurant.user_id });
            console.log(restaurant);
            await Restaurant.deleteOne({ _id: req.params.id })
            res.send({ message: "Restaurant deleted" });
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: "Internal Server Error deleteResto" });
        }
    }
    static async updateRestaurant(req, res) {
        try {
            const restaurant = await Restaurant.findOne({ user_id: req.user._id }).populate("user_id");
            if (!restaurant) {
                res.status(404).send({ error: "Restaurant not found" });
                return;
            }
            restaurant.address = req.body.address;
            restaurant.postalCode = req.body.postalCode;
            restaurant.city = req.body.city;
            await restaurant.save();
            const user = await User.findOne({ _id: restaurant.user_id._id });
            user.name = req.body.name;
            await user.save();
            res.send(restaurant);

        } catch (e) {
            console.log(e)
            res.status(500).send({ error: "Internal Server Error updateResto" });
        }
    }
}

module.exports = RestaurantController;
