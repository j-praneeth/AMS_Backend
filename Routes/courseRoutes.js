const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

// CRUD routes
router.post("/", courseController.createCourse); // Create a new course
router.get("/", courseController.getCourses); // Get all courses
router.get("/:id", courseController.getCourseById); // Get a single course by ID
router.put("/:id", courseController.updateCourse); // Update a course by ID
router.delete("/:id", courseController.deleteCourse); // Delete a course by ID

module.exports = router;
