import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: function() {
        return this.role === 'Faculty' || this.role === 'Student'; // Required only for Faculty/Student
      },
      unique: true,
      match: [/^\d{2}[A-Z]{2}\d{6}$/, 'Invalid roll number format'], // Roll number format
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Student", "Faculty", "Admin", "DEO"],
      required: true,
    },
    email: {
      type: String,
      required: function() {
        return this.role === 'Admin'; // Required only for Admin
      },
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Validates email format
    },
    password: {
      type: String,
      required: true,
    },
    gender: { 
      type: String, 
      enum: ["Male", "Female", "Other"], 
      required: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
