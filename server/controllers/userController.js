const User = require("../models/User");

exports.getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.userData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({
        email: user.email,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  };
