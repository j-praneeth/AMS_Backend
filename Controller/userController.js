// import User from "../models/User.model.js";
// import argon2 from "argon2";

// // Create a new user
// export const createUser = async (req, res) => {
//   try {
//     const { password, ...userData } = req.body;

//     // Hash the password before saving using Argon2
//     const hashedPassword = await argon2.hash(password);
//     const user = new User({ ...userData, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating user", error: error.message });
//   }
// };

// // Login user

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify the password using Argon2
//     const isMatch = await argon2.verify(user.password, password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Respond with user details (without token)
//     res.status(200).json({
//       email: user.email,
//       name: user.name,
//       gender: user.gender,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };


// // Get all users
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ message: "Users fetched successfully", users });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching users", error: error.message });
//   }
// };

// // Get a user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User fetched successfully", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching user", error: error.message });
//   }
// };

// // Update a user by ID
// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { password, ...updateData } = req.body;

//     // Hash password if it is being updated
//     if (password) {
//       updateData.password = await argon2.hash(password);
//     }

//     const user = await User.findByIdAndUpdate(id, updateData, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// };

// // Delete a user by ID
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting user", error: error.message });
//   }
// };


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


// Login user with role-based logic

// Login user with role-based logic and roll number validation for students
// Login user with role-based logic and roll number validation for students
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate roll number format for students
    const rollNumberRegex = /^\d{2}[A-Z]{2}\d{6}[A-Z\d]?$/;

    let user;

    // Check if the provided email is a roll number (Student)
    if (rollNumberRegex.test(email)) {
      // Look for a Student with this roll number
      user = await User.findOne({ email, role: "Student" });
    } else {
      // Otherwise, look for a user with a normal email (Faculty, Admin, DEO)
      user = await User.findOne({ email });
    }

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Handle role-based logic
    switch (user.role) {
      case "Student":
        res.status(200).json({
          message: "Welcome, Student!",
          role: user.role,
          rollNumber: email,
          name: user.name,
        });
        break;

      case "Faculty":
        res.status(200).json({
          message: "Welcome, Faculty!",
          role: user.role,
          email: user.email,
          name: user.name,
        });
        break;

      case "Admin":
        res.status(200).json({
          message: "Welcome, Admin!",
          role: user.role,
          email: user.email,
          name: user.name,
        });
        break;

      case "DEO":
        res.status(200).json({
          message: "Welcome, DEO!",
          role: user.role,
          email: user.email,
          name: user.name,
        });
        break;

      default:
        res.status(403).json({ message: "Unauthorized role" });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};




// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify the password using Argon2
//     const isMatch = await argon2.verify(user.password, password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Handle role-based logic
//     switch (user.role) {
//       case "Student":
//         // Logic specific to students
//         res.status(200).json({
//           message: "Welcome, Student!",
//           role: user.role,
//           email: user.email,
//           name: user.name,
//           gender: user.gender
//         });
//         break;

//       case "Faculty":
//         // Logic specific to faculty
//         res.status(200).json({
//           message: "Welcome, Faculty!",
//           role: user.role,
//           email: user.email,
//           name: user.name,
//           gender: user.gender
//         });
//         break;

//       case "Admin":
//         // Logic specific to admin
//         res.status(200).json({
//           message: "Welcome, Admin!",
//           role: user.role,
//           email: user.email,
//           name: user.name,
//           gender: user.gender
//         });
//         break;

//       case "DEO":
//         // Logic specific to DEO
//         res.status(200).json({
//           message: "Welcome, DEO!",
//           role: user.role,
//           email: user.email,
//           name: user.name,
//           gender: user.gender
//         });
//         break;

//       default:
//         res.status(403).json({ message: "Unauthorized role" });
//         break;
//     }
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
