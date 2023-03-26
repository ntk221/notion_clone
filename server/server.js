const { express, json } = require("express");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(8001, () => {
    console.log("start listening");
  });
})
.catch((err) => {
  console.error("MongoDB connection err:", err);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });
});

// GET '/'
app.get("/", (req, res) => {
  res.status(200).send("hello\n");
});

// 新規ユーザー登録
app.post("/signup", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
  });
  try {
    await user.save();
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

// 包括的エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
