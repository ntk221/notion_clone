const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");

const verifyToken = require("./libs/verifyToken");
const Article = require("./models/Article");

router.get("/", (req, res) => {
  res.status(200).send("hello\n");
});

router.post("/signup", authController.signup);

router.get("/check-auth", verifyToken, authController.checkAuth);

router.get("/user", verifyToken, userController.getUser);

router.post("/articles", async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const article = new Article({
            title,
            body,
            author,
        });
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
