
const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");

// 1. Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

// 2. Get a teacher by ID
const getTeacherById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};

// 3. Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher added successfully",
      data: newTeacher,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A teacher with this email already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Failed to add teacher",
      error: error.message,
    });
  }
};

// 4. Update a teacher
const updateTeacher = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A teacher with this email already exists",
      });
    }

    res.status(400).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};

// 5. Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID",
      });
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      data: deletedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
