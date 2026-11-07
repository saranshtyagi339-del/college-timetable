
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
    },

    // Student-specific information
    course: {
      type: String,
      default: "",
    },

    semester: {
      type: Number,
      default: null,
    },

    section: {
      type: String,
      default: "",
    },

    // Teacher-specific information
    department: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
