import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  batch_id: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
  day_wise_attendance: [
    {
      date: { type: String, required: true }, // ISO format date
      status: {
        type: String,
        enum: ["present", "absent", "partial"],
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const studentSchema = new Schema({
//   id: {
//     type: Number, // Unique identifier for the student
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String, // Full name of the student
//     required: true,
//   },
//   rollNumber: {
//     type: String, // Roll number of the student
//     required: true,
//     unique: true,
//   },
//   gender: {
//     type: String, // Gender of the student
//     enum: ["Male", "Female", "Other"],
//     required: true,
//   },
//   department: {
//     type: String, // Department of the student
//     required: true,
//   },
//   section: {
//     type: String, // Section within the department
//     required: true,
//   },
//   year: {
//     type: Number, // Academic year (e.g., 1, 2, 3, 4)
//     required: true,
//   },
//   contactInformation: {
//     phone: {
//       type: String, // Phone number of the student
//       required: true,
//     },
//     email: {
//       type: String, // Email address of the student
//       required: true,
//       unique: true,
//     },
//   },
//   attendanceTableId: {
//     type: mongoose.Schema.Types.ObjectId, // Foreign key linking to the attendance table
//     ref: "AttendanceTable",
//   },
//   dayWiseAttendance: [
//     {
//       date: { type: String, required: true }, // ISO format date
//       status: {
//         type: String,
//         enum: ["present", "absent", "partial"],
//         required: true,
//       },
//     },
//   ],
// });

// const Student = mongoose.model("Student", studentSchema);

// export default Student;
