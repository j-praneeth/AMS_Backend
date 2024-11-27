const express = require("express");
const timetableController = require("../controllers/timetableController");
const router = express.Router();

// CRUD routes
router.post("/", timetableController.createTimetable); // Create a new timetable
router.get("/", timetableController.getTimetables); // Get all timetables
router.get("/:id", timetableController.getTimetableById); // Get a timetable by ID
router.put("/:id", timetableController.updateTimetable); // Update a timetable by ID
router.delete("/:id", timetableController.deleteTimetable); // Delete a timetable by ID

module.exports = router;
