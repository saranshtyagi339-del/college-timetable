
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

// Public demo routes: no login required
router.get("/", getClasses);
router.get("/stats", getClassStats);
router.get("/:id", getClassById);

// Demo admin operations: publicly accessible
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;
