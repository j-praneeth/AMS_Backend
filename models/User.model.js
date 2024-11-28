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
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Validates email format
    },
    password: {
      type: String,
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

export default mongoose.model("User", userSchema);
