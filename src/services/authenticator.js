const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Hash = require("../utils/hash");

class Authenticator {
  async authenticate(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Unknown email");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(body) {
    try {
      const user = await User.create({
        email: body.email,
        name: body.name,
        password: await Hash.hash(body.password),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Authenticator();
