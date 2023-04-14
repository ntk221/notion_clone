const { json } = require("express");
const helmet = require("helmet");
const express = require("express");
const connectDB = require("./libs/db");

const routes = require("./routes");

const app = express();
app.use(helmet());
app.use(json());

connectDB()
  .then(() => {
    app.listen(8001, () => {
      console.log("start listening");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

app.use("/", routes);

// 包括的エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
