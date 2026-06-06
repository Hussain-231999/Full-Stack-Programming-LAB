import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["appointment", "medication", "follow-up"],
      required: true
    },
    channel: {
      type: String,
      enum: ["email", "mobile"],
      required: true
    },
    message: { type: String, required: true, trim: true },
    scheduledFor: { type: Date, required: true },
    emailPreviewUrl: { type: String, trim: true },
    emailMessageId: { type: String, trim: true },
    errorMessage: { type: String, trim: true },
    sentAt: Date,
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
