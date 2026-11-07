
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET: Fetch all students
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students.",
    });
  }
};

// POST: Create a student
const createStudent = async (req, res) => {
  try {
    const { name, email, password, course, semester, section } = req.body;

    if (!name || !email || !password || !course || !semester || !section) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required student details.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const student = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 12),
      role: "student",
      course: course.trim(),
      semester: Number(semester),
      section: section.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: {
        _id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        semester: student.semester,
        section: student.section,
        role: student.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create student.",
    });
  }
};

// PUT: Update a student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, course, semester, section } = req.body;

    const student = await User.findOne({ _id: id, role: "student" });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "This email is already in use.",
        });
      }

      student.email = normalizedEmail;
    }

    if (name !== undefined) student.name = name.trim();
    if (course !== undefined) student.course = course.trim();
    if (semester !== undefined) student.semester = Number(semester);
    if (section !== undefined) student.section = section.trim();

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must contain at least 8 characters.",
        });
      }

      student.password = await bcrypt.hash(password, 12);
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: {
        _id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        semester: student.semester,
        section: student.section,
        role: student.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update student.",
    });
  }
};

// DELETE: Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student.",
    });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
