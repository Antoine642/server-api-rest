const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Plate = require("../models/Plate");

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
            const { name, description, price, restaurantId } = req.body;
            const plate = new Plate({ name, description, price, restaurantId });
            await plate.save();
            res.send(plate);
        } catch (e) {
            res.status(400).send({ error: "Bad Request" });
        }
    }
}

module.exports = PlateController;
