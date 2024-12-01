import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
  loginStudent,
  resetPassword,
  resetPasswordStudent,
  resetPasswordOtherRoles,
} from "../Controller/userController.js";
const router = express.Router();

// CRUD routes
router.post("/", createUser); // Create a new user
router.get("/get", getUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID
router.post("/login", loginUser); // Login a user
router.post("/loginStudent",loginStudent)// Students login API call
router.post("/reset-password/student", resetPasswordStudent);
router.post("/reset-password/roles", resetPasswordOtherRoles);

router.get("/", (req, res) => {
  res.send("User route is working!");
});


export default router;
