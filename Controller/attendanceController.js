const Attendance = require("../models/attendance");

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res
      .status(201)
      .json({ message: "Attendance record created successfully", attendance });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating attendance record",
        error: error.message,
      });
  }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("user_id", "name email") // Populate user fields
      .populate("batch_id", "batch_name") // Populate batch fields
      .populate("attendance.periods.faculty_id", "name email")
      .populate("attendance.periods.subject_id", "subject_name");
    res
      .status(200)
      .json({
        message: "Attendance records fetched successfully",
        attendances,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching attendance records",
        error: error.message,
      });
  }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id)
      .populate("user_id", "name email")
      .populate("batch_id", "batch_name")
      .populate("attendance.periods.faculty_id", "name email")
      .populate("attendance.periods.subject_id", "subject_name");
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res
      .status(200)
      .json({ message: "Attendance record fetched successfully", attendance });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching attendance record",
        error: error.message,
      });
  }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res
      .status(200)
      .json({ message: "Attendance record updated successfully", attendance });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating attendance record",
        error: error.message,
      });
  }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting attendance record",
        error: error.message,
      });
  }
};
