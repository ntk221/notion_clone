const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const { json } = require("express");
app.use(helmet());
app.use(json());
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.model("User", UserSchema);

// GET '/' 
app.get("/", (req, res) => {
    res.status(200).send("hello\n");
})

// 新規ユーザー登録
app.post("/signup", async (req, res) => {
  console.log(req.body);
  console.log(req.body.password);
  const hashedPassword = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username
  });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.listen(8001, ()=> {
    console.log("start listening");
})

module.exports = app;
