const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());

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
