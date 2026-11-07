
const express = require("express");
const router = express.Router();

const {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

// Get all teachers
router.get("/", getAllTeachers);

// Get a teacher by ID
router.get("/:id", getTeacherById);

// Add a new teacher
router.post("/", addTeacher);

// Update a teacher
router.put("/:id", updateTeacher);

// Delete a teacher
router.delete("/:id", deleteTeacher);

module.exports = router;
