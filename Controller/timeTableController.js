const Timetable = require("../models/timetable");

// Create a new timetable
exports.createTimetable = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res
      .status(201)
      .json({ message: "Timetable created successfully", timetable });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating timetable", error: error.message });
  }
};

// Get all timetables
exports.getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("faculty_id", "name designation") // Populate faculty details
      .populate("periods.subject_id", "subject_name") // Populate subject details
      .populate("periods.batch_id", "batch_name"); // Populate batch details
    res
      .status(200)
      .json({ message: "Timetables fetched successfully", timetables });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching timetables", error: error.message });
  }
};

// Get a timetable by ID
exports.getTimetableById = async (req, res) => {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findById(id)
      .populate("faculty_id", "name designation")
      .populate("periods.subject_id", "subject_name")
      .populate("periods.batch_id", "batch_name");
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res
      .status(200)
      .json({ message: "Timetable fetched successfully", timetable });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching timetable", error: error.message });
  }
};

// Update a timetable by ID
exports.updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res
      .status(200)
      .json({ message: "Timetable updated successfully", timetable });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating timetable", error: error.message });
  }
};

// Delete a timetable by ID
exports.deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findByIdAndDelete(id);
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting timetable", error: error.message });
  }
};
