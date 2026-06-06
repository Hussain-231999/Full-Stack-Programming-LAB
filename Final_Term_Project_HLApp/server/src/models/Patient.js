import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    age: { type: Number, required: true, min: 0, max: 120 },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true
    },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    emergencyContact: { type: String, required: true, trim: true },
    medicalHistory: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

patientSchema.index({ city: 1 });
patientSchema.index({ assignedDoctor: 1 });

export default mongoose.model("Patient", patientSchema);

