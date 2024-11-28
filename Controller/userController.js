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

// Login USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the input is a student roll number starting with a pattern like '22AG1A'
    const isStudent = email.length === 10;
    let userRole = "";

    if (isStudent) {
      userRole = "student";
    } else if (email.includes("faculty")) {
      userRole = "faculty";
    } else if (email.includes("admin")) {
      userRole = "admin";
    } else if (email.includes("deo")) {
      userRole = "deo";
    } else {
      return res.status(400).json({ message: "Invalid login format" });
    }

    // Find the user by email or roll number
    const user = isStudent ? await User.findOne({ email: email }) : await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with consistent fields (name, email, gender, role)
    res.status(200).json({
      email: user.email,
      name: user.name,
      gender: user.gender,
      role: userRole, // Ensure the role is included
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Adjusted student login function
export const loginStudent = async (req, res) => {
  try {
    const { rollnumber, password } = req.body;

    // Validate roll number length (ensure it's the correct format)
    if (rollnumber.length !== 10) {
      return res.status(400).json({ message: "Invalid roll number format" });
    }

    // Find the student by rollnumber (not email)
    const student = await User.findOne({ rollnumber: rollnumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(student.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with student details and role
    res.status(200).json({
    
      name: student.name,
      gender: student.gender,
      id: student.rollnumber,         // Add the missing ID field
      department: "Computer Science",// Add the missing department field
      role: "student", // Fixed role for this API
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};



// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the input is a student roll number starting with a pattern like '22AG1A'
//     // const studentRollNumberRegex = /^[0-9]{2}[A-Za-z]{2}[0-9]{1}[A-Za-z]{1}[A-Za-z0-9]*$/; // Match '22AG1A' and anything after it
//     const isStudent = email.length === 10;
//     // Identify user role (student, faculty, admin, dean) based on email format
//     let userRole = "";
//     if (isStudent) {
//       userRole = "student";
//     } else if (email.includes("faculty")) {
//       userRole = "faculty";
//     } else if (email.includes("admin")) {
//       userRole = "admin";
//     } else if (email.includes("deo")) {
//       userRole = "deo";
//     } else {
//       return res.status(400).json({ message: "Invalid login format" });
//     }

//     // Find the user by email or roll number
//     const user = isStudent ? await User.findOne({ email: email }) : await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify the password using Argon2
//     const isMatch = await argon2.verify(user.password, password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Respond with user details and role
//     res.status(200).json({
//       email: user.email,
//       name: user.name,
//       gender: user.gender,
//       role: userRole, // Send the user's role
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };


// //student login api
// export const loginStudent = async (req, res) => {
//   try {
//     const { rollnumber, password } = req.body;

//     // Validate email input (roll number)
//     if (rollnumber.length !== 10) {
//       return res.status(400).json({ message: "Invalid roll number format" });
//     }

//     // Convert email to lowercase for consistency
//     // const rollNumber = email;

//     // Find the student by roll number
//     const student = await User.findOne({ rollnumber: rollnumber });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Verify the password using Argon2
//     const isMatch = await argon2.verify(student.password, password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Respond with student details
//     res.status(200).json({
//       rollnumber: student.rollnumber,
//       name: student.name,
//       gender: student.gender,
//       role: "student", // Fixed role for this API
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };
 // Assuming you're using Mongoose and the User model is in this path






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

