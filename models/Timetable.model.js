import mongoose from "mongoose";
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
  faculty_id: { type: Schema.Types.ObjectId, ref: "Faculty", required: true }, // References Faculty
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
  periods: [
    {
      time: { type: String, required: true }, // e.g., "9:00-10:00"
      subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      }, // References Subject
      batch_id: { type: Schema.Types.ObjectId, ref: "Batch", required: true }, // References Batch
    },
  ],
});

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;
