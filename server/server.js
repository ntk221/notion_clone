const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(helmet());
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
/*.then(() => {
  console.log("success!");
})
.catch((error) => {
  console.error("Error!");
})*/

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
});

const User = mongoose.model("User", UserSchema);

// GET '/' 
app.get("/", (req, res) => {
    res.status(200).send("hello\n");
})
app.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.listen(3000, ()=> {
    console.log("start listening");
})
