const express = require("express");
const subjectController = require("../controllers/subjectController");
const router = express.Router();

// CRUD routes
router.post("/", subjectController.createSubject); // Create a new subject
router.get("/", subjectController.getSubjects); // Get all subjects
router.get("/:id", subjectController.getSubjectById); // Get a subject by ID
router.put("/:id", subjectController.updateSubject); // Update a subject by ID
router.delete("/:id", subjectController.deleteSubject); // Delete a subject by ID

module.exports = router;
