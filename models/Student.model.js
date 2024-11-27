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
