const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next, UserModel = User) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const user = new UserModel({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });
    try {
      await user.save();
      const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.status(201).json({ token });
    } catch (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        if (err.keyPattern.email) {
          return res.status(409).json({ error: "Email already exists" });
        } else if (err.keyPattern.username) {
          return res.status(409).json({ error: "Username already exists" });
        }
      }
      next(err);
    }
  };

exports.checkAuth = (req, res) => {
    res.status(200).json({ message: "Authentication succeeded" });
  };
