const { Router } = require("express");
const authenticator = require("../services/authenticator");
const user = require("../models/User");

class AuthenticatorController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const accessToken = await authenticator.authenticate(email, password);
      res.send( accessToken );
    } catch (error) {
      res.status(400).send({ error: "Invalid credentials" });
    }
  }

  static async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await authenticator.create({ email, password, name });
      user.save();
      const accessToken = await authenticator.authenticate(email, password);
      res.send( accessToken );
    } catch (error) {
      res.status(400).send({ error: "Bad Request" });
    }
  }
}

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = AuthenticatorController;
