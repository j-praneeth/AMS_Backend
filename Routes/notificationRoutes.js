const express = require("express");
const notificationController = require("../controllers/notificationController");
const router = express.Router();

// CRUD routes
router.post("/", notificationController.createNotification); // Create notification
router.get("/", notificationController.getNotifications); // Get all notifications
router.get("/:id", notificationController.getNotificationById); // Get single notification by ID
router.put("/:id", notificationController.updateNotification); // Update notification by ID
router.delete("/:id", notificationController.deleteNotification); // Delete notification by ID

module.exports = router;
