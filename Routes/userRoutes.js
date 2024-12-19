// import express from "express";
// import {
//   createUser,
//   loginUser,
//   updateUser,
//   getUserById,
//   getUsers,
//   deleteUser,
//   loginStudent,
//   resetPasswordStudent,
//   resetPasswordOtherRoles,
// } from "../Controller/userController.js";
// const router = express.Router();

// // CRUD routes
// router.post("/", createUser); // Create a new user
// router.get("/get", getUsers); // Get all users
// router.get("/:id", getUserById); // Get a user by ID
// router.put("/:id", updateUser); // Update a user by ID
// router.delete("/:id", deleteUser); // Delete a user by ID
// router.post("/login", loginUser); // Login a user
// router.post("/loginStudent",loginStudent)// Students login API call
// router.post("/reset-password/student", resetPasswordStudent);
// router.post("/reset-password/roles", resetPasswordOtherRoles);
// router.post("/upload");

// router.get("/", (req, res) => {
//   res.send("User route is working!");
// });


// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import {
  createUser,
  loginUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
  loginStudent,
  resetPasswordStudent,
  resetPasswordOtherRoles,
  uploadProfilePicture,
  getProfileImage,
} from "../Controller/userController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.userId}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// CRUD routes
router.post("/", createUser); // Create a new user
router.get("/get", getUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID
router.post("/login", loginUser); // Login a user
router.post("/loginStudent", loginStudent); // Students login API call
router.post("/reset-password/student", resetPasswordStudent);
router.post("/reset-password/roles", resetPasswordOtherRoles);
router.post("/upload", upload.single('profile_picture'), uploadProfilePicture); // Upload profile picture
router.get("/profile-image/:userId", getProfileImage); // Get profile image

router.get("/", (req, res) => {
  res.send("User route is working!");
});

export default router;

