const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  batch_id: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
  date: { type: Date, required: true },
  attendance: [
    {
      date: { type: String, required: true },
      periods: [
        {
          time: { type: String, required: true }, // e.g., "9:00-10:00"
          faculty_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          }, // Reference to User
          subject_id: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
          },
          status: { type: String, enum: ["present", "absent"], required: true },
        },
      ],
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
