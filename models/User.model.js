
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true, // Ensures unique userID
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    role: {
      type: String,
      enum: ["Student", "Faculty", "Admin", "DEO"], // Restricts role to these values
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique email
      lowercase: true, // Converts email to lowercase
      match: [/^\d{2}[A-Z]{2}\d{6}[A-Z\d]?$/, 'Invalid roll number format'],
    },
    password: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
      unique: true, // Ensure rollNo is unique
      match: [/^\d{2}[A-Z]{2}\d{6}[A-Z\d]?$/, 'Invalid roll number format'],
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

export default mongoose.model("User", userSchema);