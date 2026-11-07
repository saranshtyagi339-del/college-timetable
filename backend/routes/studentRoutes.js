
const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
