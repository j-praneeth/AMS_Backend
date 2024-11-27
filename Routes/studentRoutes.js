const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

// CRUD routes
router.post("/", studentController.createStudent); // Create a new student
router.get("/", studentController.getStudents); // Get all students
router.get("/:id", studentController.getStudentById); // Get a single student by ID
router.put("/:id", studentController.updateStudent); // Update a student by ID
router.delete("/:id", studentController.deleteStudent); // Delete a student by ID

module.exports = router;
