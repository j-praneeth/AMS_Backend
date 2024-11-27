const express = require("express");
const batchController = require("../controllers/batchController");
const router = express.Router();

// CRUD routes
router.post("/", batchController.createBatch); // Create a new batch
router.get("/", batchController.getBatches); // Get all batches
router.get("/:id", batchController.getBatchById); // Get a single batch by ID
router.put("/:id", batchController.updateBatch); // Update a batch by ID
router.delete("/:id", batchController.deleteBatch); // Delete a batch by ID

module.exports = router;
