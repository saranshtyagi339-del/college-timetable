
const mongoose = require("mongoose");
const dns = require("dns");

// Use Google's DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;
