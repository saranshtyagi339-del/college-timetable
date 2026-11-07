
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    teacher: {
      type: String,
      required: true,
      trim: true,
    },

    room: {
      type: String,
      required: true,
      trim: true,
    },

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Lecture", "Practical"],
    },

    course: {
      type: String,
      required: true,
      trim: true,
      default: "Computer Science",
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
      default: 5,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      default: "A",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
