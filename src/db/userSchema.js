const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    login: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
