import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    symptoms: { type: String, required: true, trim: true },
    requestedAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed", "cancelled"],
      default: "pending"
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
