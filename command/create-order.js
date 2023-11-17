// npm install prompts
require('dotenv').config();
require('../src/utils/mongoose');
const prompts = require("prompts");
const Order = require("../src/models/Order");

async function main() {
    const questions = [
        {
            type: "text",
            name: "user_id",
            message: "What is the user_id for the order?",
        },
        {
            type: "text",
            name: "restaurant_id",
            message: "What is the restaurant_id for the order?",
        },
        {
            type: "number",
            name: "numberOfItems",
            message: "How many items are in the order?",
        },
    ];

    const response = await prompts(questions);

    // Création des éléments de la commande (chaque élément a un plate_id et une quantité)
    const items = [];
    for (let i = 0; i < response.numberOfItems; i++) {
        const itemQuestions = [
            {
                type: "text",
                name: "plate_id",
                message: `Enter the plate_id for item ${i + 1}:`,
            },
            {
                type: "number",
                name: "quantity",
                message: `Enter the quantity for item ${i + 1}:`,
            },
        ];

        const itemResponse = await prompts(itemQuestions);
        items.push(itemResponse);
    }

    // Création de la commande avec les réponses fournies
    const orderData = {
        user_id: response.user_id,
        restaurant_id: response.restaurant_id,
        items: items.map(item => ({
            plate_id: item.plate_id,
            quantity: item.quantity,
        })),
        status: 'PROCESSING',
    };

    const order = new Order(orderData);

    try {
        await order.save();
        console.log("Order created!");
    } catch (error) {
        console.error("Error creating order:", error.message);
    }

    process.exit();
}

main();