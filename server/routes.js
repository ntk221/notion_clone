const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const articleController = require("./controllers/articleController");

const verifyToken = require("./libs/verifyToken");
const Article = require("./models/Article");

router.get("/", (req, res) => {
  res.status(200).send("hello\n");
});

router.post("/signup", authController.signup);

router.get("/check-auth", verifyToken, authController.checkAuth);

router.get("/user", verifyToken, userController.getUser);

router.get("/articles", verifyToken, articleController.getArticles);

router.post("/articles", verifyToken, articleController.postArticle);

module.exports = router;