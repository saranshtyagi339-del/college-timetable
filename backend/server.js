
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Server port
const PORT = process.env.PORT || 5000;

// Welcome route
app.get("/", (req, res) => {
  res.send("College Timetable Planner Backend is running!");
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is working successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
