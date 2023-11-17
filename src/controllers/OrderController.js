const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Order = require("../models/Order");

class OrderController {
    static async getOrders(req, res) {
        res.send(await Order.find());
    }

    static async getOrderById(req, res) {
        try {
            const order = await Order.findOne({ _id: req.params.id });
            if (!order) {
                res.status(404).send({ error: "Order not found" });
                return;
            }
            res.send(order);
        } catch (e) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    static async createOrder(req, res) {
        try {
            const { user_id, restaurant_id, items, status } = req.body;
            const order = new Order({ user_id, restaurant_id, items, status });
            await order.save();
            res.send(order);
        } catch (e) {
            res.status(400).send({ error: "Bad Request" });
        }
    }
}

module.exports = OrderController;
