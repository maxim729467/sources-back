const bcrypt = require("bcrypt");
const User = require("../db/userSchema");
const { createToken } = require("../helpers/tokenUtils");
const { NotAuthorizedError } = require("../helpers/errorHandlers");
require("dotenv").config();

const loginUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user || user.password !== password) {
      next(new NotAuthorizedError("Wrong credentials"));
      return;
    }

    const userId = user._id;
    const token = createToken(userId);
    await User.updateOne({ _id: user._id }, { token });

    return res.json({ message: "success", token });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    return res.status(204).json({ message: "successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
