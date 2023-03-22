const express = require("express");
const app = express();

// GET '/' 
app.get('/', (req, res) => {
    res.status(200).send("hello\n");
})

app.listen(3000, ()=> {
    console.log("start listening");
})