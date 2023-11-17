// npm install prompts
require('dotenv').config();
require('../src/utils/mongoose');
const prompts = require("prompts");
const User = require("../src/models/User");
const Hash = require("../src/utils/hash");

async function main() {
    const questions = [
        {
            type: "text",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "text",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "password",
            name: "password",
            message: "What is your password?"
        }
    ];

    const response = await prompts(questions);
    const password = response.password;
    //hash
    response.password = await Hash.hash(password);
    const user = new User({...response, role: "ADMIN"});
    await user.save();
    console.log("User created!");
    process.exit();
}

main();
