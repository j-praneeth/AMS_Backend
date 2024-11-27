const express = require("express");
const facultyController = require("../controllers/facultyController");
const router = express.Router();

// CRUD routes
router.post("/", facultyController.createFaculty); // Create a new faculty
router.get("/", facultyController.getFaculties); // Get all faculties
router.get("/:id", facultyController.getFacultyById); // Get a single faculty by ID
router.put("/:id", facultyController.updateFaculty); // Update a faculty by ID
router.delete("/:id", facultyController.deleteFaculty); // Delete a faculty by ID

module.exports = router;
