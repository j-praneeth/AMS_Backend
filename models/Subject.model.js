import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  subject_name: { type: String, required: true },
  department: { type: String, required: true },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
