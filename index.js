
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");

// API Routes
app.use("/api/complaints", complaintRoutes);
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CampusFix API!",
    project: "CampusFix - Smart Campus Issue Reporting System",
    version: "1.0.0"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusFix server is healthy"
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;

// Start Server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`CampusFix Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

startServer();

