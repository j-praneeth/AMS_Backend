import User from "../models/User.model.js";
import argon2 from "argon2";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    // Hash the password before saving using Argon2
    const hashedPassword = await argon2.hash(password);
    const user = new User({ ...userData, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Student Login API
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email input (roll number)
    if (!email || typeof email !== "string" || email.length !== 10) {
      return res.status(400).json({ message: "Invalid roll number format" });
    }

    // Convert email to UpperCase for consistency
    const rollNumber = email.toUpperCase();

    // Debugging log
    console.log("Roll number (email):", rollNumber);

    // Find the student by roll number with case-insensitive search
    const student = await User.findOne({ email: { $regex: new RegExp(`^${rollNumber}$`, 'i') } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(student.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with student details
    res.status(200).json({
      email: student.email,
      name: student.name,
      gender: student.gender,
      role: "student", // Fixed role for this API
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


// Login user with role-based logic
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure email is provided and valid
    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Convert email to lowercase for consistent comparisons
    const emailLowerCase = email.toLowerCase();

    // Check if the input is a student roll number (10 characters)
    const isStudent = emailLowerCase.length === 10;

    // Identify user role based on email format
    let userRole = "";
    if (isStudent) {
      userRole = "student";
    } else if (emailLowerCase.includes("faculty")) {
      userRole = "faculty";
    } else if (emailLowerCase.includes("admin")) {
      userRole = "admin";
    } else if (emailLowerCase.includes("deo")) {
      userRole = "deo";
    } else {
      return res.status(400).json({ message: "Invalid login format" });
    }

    // Find the user by email or roll number
    const user = isStudent
      ? await User.findOne({ email: emailLowerCase }) // For students, use email (roll number)
      : await User.findOne({ email: emailLowerCase }); // For others, use email directly

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with user details and role
    res.status(200).json({
      userId:user.userID,
      email: user.email,
      name: user.name,
      gender: user.gender,
      role: userRole, // Send the user's role
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    // Hash password if it is being updated
    if (password) {
      updateData.password = await argon2.hash(password);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
