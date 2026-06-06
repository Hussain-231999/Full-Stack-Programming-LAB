import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import TreatmentRecord from "../models/TreatmentRecord.js";

const router = Router();

router.get("/", authenticate, (req, res) => {
  const dashboards = {
    admin: "/api/dashboard/admin",
    doctor: "/api/dashboard/doctor",
    patient: "/api/dashboard/patient"
  };

  res.json({
    message: "Dashboard access granted",
    role: req.user.role,
    next: dashboards[req.user.role]
  });
});

router.get("/admin", authenticate, authorize("admin"), (_req, res) => {
  res.json({
    role: "admin",
    permissions: ["manage doctors", "manage patients", "confirm appointments", "assign doctors"]
  });
});

router.get("/doctor", authenticate, authorize("doctor"), async (req, res) => {
  const doctorProfile = await Doctor.findOne({ user: req.user._id }).populate("user", "name email phone role");
  let assignedPatients = [];

  if (doctorProfile && doctorProfile.approvalStatus === "approved" && doctorProfile.isActive) {
    const treatmentPatientIds = await TreatmentRecord.distinct("patient", { doctor: doctorProfile._id });

    assignedPatients = await Patient.find({
      $or: [
        { assignedDoctor: doctorProfile._id },
        { user: { $in: treatmentPatientIds } }
      ]
    })
      .populate("user", "name email phone role")
      .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } })
      .sort({ createdAt: -1 });
  }

  res.json({
    role: "doctor",
    permissions: ["view assigned appointments", "record checkups", "manage prescriptions", "schedule follow-ups"],
    doctorProfile,
    assignedPatients,
    profileStatus: doctorProfile ? doctorProfile.approvalStatus : "missing-profile"
  });
});

router.get("/patient", authenticate, authorize("patient"), async (req, res) => {
  const patientProfile = await Patient.findOne({ user: req.user._id })
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  res.json({
    role: "patient",
    permissions: ["book appointments", "view prescriptions", "view medication schedule", "view follow-ups"],
    patientProfile,
    assignedDoctor: patientProfile?.assignedDoctor || null,
    profileStatus: patientProfile ? "active" : "missing-profile"
  });
});

export default router;
