const argon2 = require('argon2');
const User = require('../models/User'); // Assuming you're using Mongoose and the User model is in this path

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is likely a student email by checking if it has a length of 10 characters
    const isStudent = email.length === 10; // Student email length is 10

    // Find the user by email (works for all roles, including student)
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password using Argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Handle different roles after successful login
    if (user.role === 'Admin') {
      res.status(200).json({
        message: 'Admin logged in successfully',
        email: user.email,
        name: user.name,
        gender: user.gender,
        role: user.role,
      });
    } else if (user.role === 'Faculty') {
      res.status(200).json({
        message: 'Faculty logged in successfully',
        email: user.email,
        name: user.name,
        gender: user.gender,
        role: user.role,
      });
    } else if (user.role === 'DEO') {
      res.status(200).json({
        message: 'DEO logged in successfully',
        email: user.email,
        name: user.name,
        gender: user.gender,
        role: user.role,
      });
    } else if (user.role === 'Student' && isStudent) {
      res.status(200).json({
        message: 'Student logged in successfully',
        email: user.email,
        name: user.name,
        gender: user.gender,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Unknown role or incorrect email format' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { loginUser };
