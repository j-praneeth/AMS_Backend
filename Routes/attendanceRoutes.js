const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const router = express.Router();

// CRUD Routes
router.post("/", attendanceController.createAttendance); // Create attendance record
router.get("/", attendanceController.getAttendances); // Get all attendance records
router.get("/:id", attendanceController.getAttendanceById); // Get single attendance record by ID
router.put("/:id", attendanceController.updateAttendance); // Update attendance record by ID
router.delete("/:id", attendanceController.deleteAttendance); // Delete attendance record by ID

module.exports = router;
