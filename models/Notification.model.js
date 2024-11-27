import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  notification_id: { type: String, required: true, unique: true }, // Unique ID for the notification
  title: { type: String, required: true }, // Short title of the notification
  message: { type: String, required: true }, // Detailed notification message
  recipient_type: {
    type: String,
    enum: ["User", "Batch", "Faculty", "All"],
    required: true,
  }, // Defines the target audience
  recipient_ids: [{ type: Schema.Types.ObjectId }], // List of recipients (if 'User', 'Batch', or 'Faculty')
  category: {
    type: String,
    enum: ["Reminder", "Alert", "Info", "Announcement"],
    required: true,
  }, // Type of notification
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  }, // Priority level
  status: {
    type: String,
    enum: ["Sent", "Delivered", "Read", "Expired"],
    default: "Sent",
  }, // Tracks the state of the notification
  created_at: { type: Date, default: Date.now }, // Timestamp when the notification was created
  updated_at: { type: Date, default: Date.now }, // Timestamp for updates
  ttl: { type: Date }, // Time-To-Live: When the notification should auto-expire
  metadata: { type: Object }, // Optional metadata for additional data
});

// Pre-save middleware to update the `updated_at` field
notificationSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
