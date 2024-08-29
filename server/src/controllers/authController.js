const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
const getAllUsers = async (req, res) => {
  try {
    const user = await users.find();
    return res.status(200).json({
      success: user ? true : false,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Invalid");
    const response = await users.findOne({ username });
    const isCorrectPassword =
      response && bcrypt.compareSync(password, response.password);

    const accessToken =
      isCorrectPassword &&
      jwt.sign(
        { id: response?._id, role: response?.role },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

    return res.status(200).json({
      success: accessToken
        ? 0
        : isCorrectPassword
        ? "Login successful"
        : "Username or password incorrect",
      accessToken: accessToken || null,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) throw new Error("Invalid");
    let user = await users.findOne({ username });

    if (user) throw new Error("User already exists");
    const newUser = await users.create({
      username: username,
      password: hashPassword(password),
    });

    newUser.save();
    return res.status(200).json({
      success: newUser ? true : false,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  register,
  login,
};
