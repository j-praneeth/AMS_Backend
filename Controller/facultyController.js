const Faculty = require("../models/faculty");

// Create a new faculty
exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ message: "Faculty created successfully", faculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating faculty", error: error.message });
  }
};

// Get all faculties
exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find()
      .populate("user", "name email") // Populate user details
      .populate("subjects", "subject_name") // Populate subject details
      .populate("batches", "batch_name"); // Populate batch details
    res
      .status(200)
      .json({ message: "Faculties fetched successfully", faculties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculties", error: error.message });
  }
};

// Get a single faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id)
      .populate("user", "name email")
      .populate("subjects", "subject_name")
      .populate("batches", "batch_name");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty fetched successfully", faculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculty", error: error.message });
  }
};

// Update a faculty by ID
exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty updated successfully", faculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating faculty", error: error.message });
  }
};

// Delete a faculty by ID
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting faculty", error: error.message });
  }
};
