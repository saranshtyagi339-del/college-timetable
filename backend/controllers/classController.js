
const Class = require("../models/Class");
const mongoose = require("mongoose");

// GET: Fetch timetable according to user role
const getClasses = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "admin") {
      // Admin can view all classes, including drafts
      filter = {};
    } else if (req.user.role === "student") {
      // Students see only their published timetable
      filter = {
        status: "published",
        course: req.user.course,
        semester: req.user.semester,
        section: req.user.section,
      };
    } else if (req.user.role === "teacher") {
      // Teachers see only their published classes
      filter = {
        status: "published",
        teacher: req.user.name,
      };
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    const classes = await Class.find(filter).sort({
      day: 1,
      startTime: 1,
    });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch timetable entries.",
    });
  }
};

// GET: Fetch dashboard statistics
const getClassStats = async (req, res) => {
  try {
    const totalClasses = await Class.countDocuments();

    const subjects = await Class.distinct("subject");
    const teachers = await Class.distinct("teacher");
    const classrooms = await Class.distinct("room");

    res.status(200).json({
      success: true,
      data: {
        totalClasses,
        totalSubjects: subjects.length,
        totalTeachers: teachers.length,
        totalClassrooms: classrooms.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch timetable statistics.",
    });
  }
};

// GET: Fetch one timetable entry
const getClassById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID.",
      });
    }

    let filter = { _id: req.params.id };

    if (req.user.role === "student") {
      filter = {
        ...filter,
        status: "published",
        course: req.user.course,
        semester: req.user.semester,
        section: req.user.section,
      };
    } else if (req.user.role === "teacher") {
      filter = {
        ...filter,
        status: "published",
        teacher: req.user.name,
      };
    }

    const timetableClass = await Class.findOne(filter);

    if (!timetableClass) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: timetableClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch timetable entry.",
    });
  }
};

// POST: Create a timetable entry
const createClass = async (req, res) => {
  try {
    const {
      subject,
      teacher,
      room,
      day,
      startTime,
      endTime,
      type,
      course,
      semester,
      section,
      status,
    } = req.body;

    if (
      !subject ||
      !teacher ||
      !room ||
      !day ||
      !startTime ||
      !endTime ||
      !type ||
      !course ||
      !semester ||
      !section
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required timetable details.",
      });
    }

    const newClass = await Class.create({
      subject,
      teacher,
      room,
      day,
      startTime,
      endTime,
      type,
      course,
      semester: Number(semester),
      section,
      status: status === "published" ? "published" : "draft",
    });

    res.status(201).json({
      success: true,
      message: "Timetable entry created successfully.",
      data: newClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create timetable entry.",
    });
  }
};

// PUT: Update a timetable entry
const updateClass = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID.",
      });
    }

    const allowedFields = [
      "subject",
      "teacher",
      "room",
      "day",
      "startTime",
      "endTime",
      "type",
      "course",
      "semester",
      "section",
      "status",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] =
          field === "semester"
            ? Number(req.body[field])
            : req.body[field];
      }
    });

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timetable entry updated successfully.",
      data: updatedClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update timetable entry.",
    });
  }
};

// DELETE: Delete a timetable entry
const deleteClass = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid timetable ID.",
      });
    }

    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Timetable entry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timetable entry deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete timetable entry.",
    });
  }
};

module.exports = {
  getClasses,
  getClassStats,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
