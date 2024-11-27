const Batch = require("../models/batch");

// Create a new batch
exports.createBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json({ message: "Batch created successfully", batch });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating batch", error: error.message });
  }
};

// Get all batches
exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate("course_id", "course_name") // Populate course details
      .populate("students", "name email"); // Populate student details
    res.status(200).json({ message: "Batches fetched successfully", batches });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching batches", error: error.message });
  }
};

// Get a single batch by ID
exports.getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findById(id)
      .populate("course_id", "course_name")
      .populate("students", "name email");
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch fetched successfully", batch });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching batch", error: error.message });
  }
};

// Update a batch by ID
exports.updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findByIdAndUpdate(id, req.body, { new: true });
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch updated successfully", batch });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating batch", error: error.message });
  }
};

// Delete a batch by ID
exports.deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const batch = await Batch.findByIdAndDelete(id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting batch", error: error.message });
  }
};
