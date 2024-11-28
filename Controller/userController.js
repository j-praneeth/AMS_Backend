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

// Login user

export const loginUser = async (req, res) => {
  try {
    const { emailOrRollNo, password } = req.body;

    // Determine if the user is an admin or not
    let user;
    
    // If the user is an admin, log in by email
    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailOrRollNo)) {
      user = await User.findOne({ email: emailOrRollNo, role: "Admin" });
    } else {
      // Otherwise, it's a roll number (userID) and should match either student or faculty
      user = await User.findOne({ userID: emailOrRollNo, role: { $in: ["Faculty", "Student"] } });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found or incorrect role" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with user details (excluding password)
    res.status(200).json({
      email: user.email,
      name: user.name,
      gender: user.gender,
      role: user.role, // Include role in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user =  await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify password using Argon2
//     const isMatch = await argon2.verify(user.password, password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

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
