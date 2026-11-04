
const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");
const { protect, authorize } = require("../middleware/authMiddleware");

// ========================================
// CREATE COMPLAINT — STUDENTS ONLY
// ========================================

router.post(
  "/",
  protect,
  authorize("Student"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        location,
        priority,
      } = req.body;

      if (!title || !description || !category || !location) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required complaint details.",
        });
      }

      const complaint = await Complaint.create({
        title,
        description,
        category,
        location,
        priority: priority || "Medium",
        reportedBy: req.user._id.toString(),
      });

      res.status(201).json({
        success: true,
        message: "Complaint submitted successfully.",
        data: complaint,
      });
    } catch (error) {
      console.error("Create complaint error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to submit complaint.",
      });
    }
  }
);

// ========================================
// GET COMPLAINTS
// ADMIN: ALL COMPLAINTS
// STUDENT: OWN COMPLAINTS
// STAFF: ASSIGNED COMPLAINTS
// ========================================

router.get(
  "/",
  protect,
  authorize("Student", "Admin", "Staff"),
  async (req, res) => {
    try {
      let filter = {};

      if (req.user.role === "Student") {
        filter.reportedBy = req.user._id.toString();
      }

      if (req.user.role === "Staff") {
        filter.assignedTo = req.user.name;
      }

      if (req.query.status) {
        filter.status = req.query.status;
      }

      if (req.query.category) {
        filter.category = req.query.category;
      }

      if (req.query.priority) {
        filter.priority = req.query.priority;
      }

      if (req.query.search) {
        filter.title = {
          $regex: req.query.search,
          $options: "i",
        };
      }

      const complaints = await Complaint.find(filter).sort({
        createdAt: -1,
      });

      res.json({
        success: true,
        count: complaints.length,
        data: complaints,
      });
    } catch (error) {
      console.error("Fetch complaints error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to fetch complaints.",
      });
    }
  }
);

// ========================================
// GET SINGLE COMPLAINT
// ========================================

router.get("/:id", protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    const isAdmin = req.user.role === "Admin";

    const isOwner =
      req.user.role === "Student" &&
      complaint.reportedBy === req.user._id.toString();

    const isAssignedStaff =
      req.user.role === "Staff" &&
      complaint.assignedTo === req.user.name;

    if (!isAdmin && !isOwner && !isAssignedStaff) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this complaint.",
      });
    }

    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve complaint.",
    });
  }
});

// ========================================
// UPDATE COMPLAINT
// ADMIN: ASSIGN AND UPDATE
// STAFF: UPDATE ASSIGNED COMPLAINT STATUS
// ========================================

router.put("/:id", protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    if (req.user.role === "Admin") {
      const allowedFields = [
        "title",
        "description",
        "category",
        "location",
        "priority",
        "status",
        "assignedTo",
      ];

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          complaint[field] = req.body[field];
        }
      });
    } else if (req.user.role === "Staff") {
      if (complaint.assignedTo !== req.user.name) {
        return res.status(403).json({
          success: false,
          message: "This complaint is not assigned to you.",
        });
      }

      if (
        !req.body.status ||
        Object.keys(req.body).some((field) => field !== "status")
      ) {
        return res.status(403).json({
          success: false,
          message: "Staff can only update complaint status.",
        });
      }

      complaint.status = req.body.status;
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not permitted to update complaints.",
      });
    }

    await complaint.save();

    res.json({
      success: true,
      message: "Complaint updated successfully.",
      data: complaint,
    });
  } catch (error) {
    console.error("Update complaint error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update complaint.",
    });
  }
});

// ========================================
// DELETE COMPLAINT — ADMIN ONLY
// ========================================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  async (req, res) => {
    try {
      const complaint = await Complaint.findByIdAndDelete(
        req.params.id
      );

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: "Complaint not found.",
        });
      }

      res.json({
        success: true,
        message: "Complaint deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to delete complaint.",
      });
    }
  }
);

module.exports = router;
