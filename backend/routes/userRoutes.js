
const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    user: req.user,
  });
});

router.get("/admin-test", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome, Admin!",
  });
});

module.exports = router;
