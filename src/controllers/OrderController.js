const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

class OrderController {
    static async getOrders(req, res) {
        const orders = await Order.find({ status: { $ne: 'CANCELED' } });
        res.send(orders);
    }

    static async cancelOrder(req, res) {
        try {
            const order = await Order.findOne({ _id: req.params.id });
            if (!order) {
                res.status(404).send({ error: "Order not found" });
                return;
            }
            order.status = "CANCELED";
            await order.save();
            res.send(order);
        } catch (e) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    }

    
}

module.exports = OrderController;
