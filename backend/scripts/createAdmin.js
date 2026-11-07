
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const User = require("../models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdmin() {
  try {
    console.log("\n===== TIMELY ADMIN SETUP =====\n");

    const name = (await ask("Enter admin name: ")).trim();
    const email = (await ask("Enter admin email: ")).trim().toLowerCase();
    const password = await ask("Enter admin password: ");

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from your .env file.");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from your .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("\nConnected to MongoDB.");

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error(
        "An account with this email already exists. No account was created."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("\nAdmin account created successfully!");
    console.log("--------------------------------");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("--------------------------------");
    console.log("You can now log in through Timely.");
  } catch (error) {
    console.error("\nAdmin setup failed:", error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

createAdmin();
