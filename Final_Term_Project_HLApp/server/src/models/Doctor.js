import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialty: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    experienceYears: { type: Number, required: true, min: 0, max: 60 },
    hospitalDepartment: { type: String, required: true, trim: true },
    availableDays: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }],
    consultationFee: { type: Number, required: true, min: 0 },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

doctorSchema.index({ user: 1 }, { unique: true });
doctorSchema.index({ specialty: 1 });
doctorSchema.index({ approvalStatus: 1 });

export default mongoose.model("Doctor", doctorSchema);
