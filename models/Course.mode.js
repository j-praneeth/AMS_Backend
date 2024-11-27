import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: { type: String, required: true },
  duration: { type: Number, required: true }, // in years
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
