
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a student or teacher
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      course,
      semester,
      section,
      department,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required.",
      });
    }

    const normalizedRole = role.toLowerCase();

    // Prevent public admin registration
    if (!["student", "teacher"].includes(normalizedRole)) {
      return res.status(403).json({
        success: false,
        message:
          "Public registration is only available for students and teachers.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether account already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,

      course: normalizedRole === "student" ? course : undefined,
      semester: normalizedRole === "student" ? semester : undefined,
      section: normalizedRole === "student" ? section : undefined,

      department: normalizedRole === "teacher" ? department : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

// Login for student, teacher and admin
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required.",
      });
    }

    const normalizedRole = role.toLowerCase();

    if (!["student", "teacher", "admin"].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    // Find user with matching email and role
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      role: normalizedRole,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password or account type.",
      });
    }

    // Verify password
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password or account type.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Return complete user profile without password
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        // Student information
        course: user.course,
        semester: user.semester,
        section: user.section,

        // Teacher information
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
