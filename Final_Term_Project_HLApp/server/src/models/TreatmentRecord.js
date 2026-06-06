import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    medicine: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true },
    duration: { type: String, trim: true }
  },
  { _id: false }
);

const physicalCheckupSchema = new mongoose.Schema(
  {
    bloodPressure: { type: String, trim: true },
    temperature: { type: String, trim: true },
    pulse: { type: String, trim: true },
    weight: { type: String, trim: true },
    observations: { type: String, trim: true }
  },
  { _id: false }
);

const followUpSchema = new mongoose.Schema(
  {
    visitDate: { type: Date, required: true },
    notes: { type: String, trim: true },
    statusAfterVisit: {
      type: String,
      enum: ["active", "follow-up", "completed"],
      default: "follow-up"
    }
  },
  { timestamps: true }
);

const visitSchema = new mongoose.Schema(
  {
    visitDate: { type: Date, required: true, default: Date.now },
    checkupNotes: { type: String, required: true, trim: true },
    diagnosis: { type: String, trim: true },
    physicalCheckup: physicalCheckupSchema,
    prescriptions: [prescriptionSchema],
    followUpDate: Date,
    statusAfterVisit: {
      type: String,
      enum: ["active", "follow-up", "completed"],
      required: true
    }
  },
  { timestamps: true }
);

const treatmentRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    checkupNotes: { type: String, required: true, trim: true },
    diagnosis: { type: String, trim: true },
    physicalCheckup: physicalCheckupSchema,
    prescriptions: [prescriptionSchema],
    followUpDate: Date,
    status: {
      type: String,
      enum: ["active", "follow-up", "completed"],
      default: "active"
    },
    progressNotes: { type: String, trim: true },
    followUpVisits: [followUpSchema],
    visits: [visitSchema]
  },
  { timestamps: true }
);

treatmentRecordSchema.index({ appointment: 1 }, { unique: true });
treatmentRecordSchema.index({ patient: 1 });
treatmentRecordSchema.index({ doctor: 1 });

export default mongoose.model("TreatmentRecord", treatmentRecordSchema);
