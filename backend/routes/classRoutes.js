
const express = require("express");

const router = express.Router();

const {
  getAllClasses,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

// GET all classes
router.get("/", getAllClasses);

// GET one class
router.get("/:id", getClassById);

// POST a new class
router.post("/", addClass);

// PUT update a class
router.put("/:id", updateClass);

// DELETE a class
router.delete("/:id", deleteClass);

module.exports = router;
