const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
app.use(helmet());

mongoose.connect("mongodb+srv://Kazuki:vzo60AmntFz7h24M@cluster0.aydmxll.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("success!");
})
.catch((error) => {
  console.error("Error!");
})

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
