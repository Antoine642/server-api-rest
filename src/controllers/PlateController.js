const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Plate = require("../models/Plate");
const Restaurant = require("../models/Restaurant");

class PlateController {
    static async getPlates(req, res) {
        res.send(await Plate.find());
    }

    static async getPlateById(req, res) {
        try {
            const plate = await Plate.findOne({ _id: req.params.id });
            if (!plate) {
                res.status(404).send({ error: "Plate not found" });
                return;
            }
            res.send(plate);
        } catch (e) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async createPlate(req, res) {
        try {
            const restaurant = await Restaurant.findOne({ user_id: req.user._id });
            if (!restaurant) {
                res.status(404).send({ error: "Restaurant not found" });
                return;
            }
            console.log(restaurant._id)
            const { name, description, image, price } = req.body;
            const plate = new Plate({ name, description, price, image, restaurant_id: restaurant._id });
            await plate.save();
            res.send(plate);
        } catch (e) {
            console.log(e)
            res.status(400).send({ error: "Bad Request" });
        }
    }

    static async updatePlate(req, res) {
        try {
            const plate = await Plate.findOne({ _id: req.params.id });
            if (!plate) {
                res.status(404).send({ error: "Plate not found" });
                return;
            }
            const { name, description, image, price } = req.body;
            plate.name = name;
            plate.description = description;
            plate.image = image;
            plate.price = price;
            await plate.save();
            res.send(plate);
        } catch (e) {
            res.status(400).send({ error: "Bad Request" });
        }
    }
}

module.exports = PlateController;
