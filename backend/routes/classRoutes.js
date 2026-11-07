
const express = require("express");
const router = express.Router();

const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getClassStats,
} = require("../controllers/classController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// All timetable routes require authentication
router.use(protect);

// Get timetable entries (role-specific filtering will be added next)
router.get("/", getClasses);

// Dashboard statistics — admin only
router.get("/stats", authorize("admin"), getClassStats);

// Get one timetable entry
router.get("/:id", getClassById);

// Admin-only timetable operations
router.post("/", authorize("admin"), createClass);
router.put("/:id", authorize("admin"), updateClass);
router.delete("/:id", authorize("admin"), deleteClass);

module.exports = router;
