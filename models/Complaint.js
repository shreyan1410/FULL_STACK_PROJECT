
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electrical",
        "Plumbing",
        "Cleaning",
        "Wi-Fi",
        "Classroom",
        "Hostel",
        "Other"
      ]
    },

    location: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Resolved",
        "Rejected"
      ],
      default: "Pending"
    },

    reportedBy: {
      type: String,
      required: true
    },

    assignedTo: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
