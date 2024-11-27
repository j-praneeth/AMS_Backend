import mongoose from "mongoose";
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  batches: [{ type: Schema.Types.ObjectId, ref: "Batch" }],
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
