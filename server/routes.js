const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const authController = require("./controllers/authController");

const verifyToken = require("./libs/verifyToken");

router.get("/", (req, res) => {
  res.status(200).send("hello\n");
});

router.post("/signup", authController.signup);

router.get("/check-auth", verifyToken, authController.checkAuth);

router.get("/user", verifyToken, userController.getUser);

module.exports = router;