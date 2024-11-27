import mongoose from "mongoose";
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  batch_name: { type: String, required: true },
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  batch_year: { type: String, required: true },
  facultyToken: { type: String, required: true },
  StudentToken: { type: String, required: true },
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
