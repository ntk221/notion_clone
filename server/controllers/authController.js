const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next, UserModel = User) => {
  try {
    const existingUser = await UserModel.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (existingUser) {
      return res.status(409).json({ error: existingUser.email === req.body.email ? "Email already exists" : "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const user = new UserModel({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    await user.save();
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next, UserModel = User) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Auth failed" });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Auth failed" });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = (req, res) => {
  res.status(200).json({ message: "Authentication succeeded" });
};


exports.checkAuth = (req, res) => {
    res.status(200).json({ message: "Authentication succeeded" });
  };
