const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
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
app.post("/signup", (req, res) => {
  /* ... */
})

app.listen(3000, ()=> {
    console.log("start listening");
})
