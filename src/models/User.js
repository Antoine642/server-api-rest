const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "RESTAURANT"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    role: this.role,
  };
};

module.exports = mongoose.model("User", UserSchema);
