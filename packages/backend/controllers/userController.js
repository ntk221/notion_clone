const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Auth failed" });
        }
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
          email: user.email,
          username: user.username,
          id: user._id
        });
      });
    } catch (err) {
      next(err);
    }
  };
