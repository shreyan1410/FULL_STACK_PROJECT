
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");
const User = require("./models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createRoleUser() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("\nConnected to CampusFix database.\n");

    const name = (await ask("Enter full name: ")).trim();
    const email = (await ask("Enter email: ")).trim().toLowerCase();
    const password = await ask("Enter password (minimum 8 characters): ");
    const role = (await ask("Enter role (Admin/Staff): ")).trim();

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    if (!["Admin", "Staff"].includes(role)) {
      throw new Error("Role must be Admin or Staff.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("\nAccount created successfully!");
    console.log("Name:", newUser.name);
    console.log("Email:", newUser.email);
    console.log("Role:", newUser.role);

  } catch (error) {
    console.error("\nError:", error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

createRoleUser();
