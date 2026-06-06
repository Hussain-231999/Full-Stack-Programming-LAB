import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import TreatmentRecord from "../models/TreatmentRecord.js";
import {
  createFollowUpReminderNotifications,
  createMedicationReminderNotifications
} from "../utils/notifications.js";

const router = Router();

const treatmentStatuses = ["active", "follow-up", "completed"];

async function getDoctorProfile(userId) {
  return Doctor.findOne({ user: userId, approvalStatus: "approved", isActive: true });
}

async function canAccessTreatment(user, record) {
  const patientId = record.patient?._id || record.patient;
  const doctorId = record.doctor?._id || record.doctor;

  if (user.role === "admin") {
    return true;
  }

  if (user.role === "patient") {
    return patientId.toString() === user._id.toString();
  }

  if (user.role === "doctor") {
    const doctorProfile = await getDoctorProfile(user._id);
    return doctorProfile?._id.toString() === doctorId.toString();
  }

  return false;
}

function populateTreatment(query) {
  return query
    .populate("patient", "name email phone")
    .populate({ path: "doctor", populate: { path: "user", select: "name email phone" } })
    .populate({
      path: "appointment",
      populate: [
        { path: "patient", select: "name email phone" },
        { path: "doctor", populate: { path: "user", select: "name email phone" } }
      ]
    });
}

function buildPhysicalCheckup(body) {
  return {
    bloodPressure: body.bloodPressure,
    temperature: body.temperature,
    pulse: body.pulse,
    weight: body.weight,
    observations: body.observations
  };
}

function buildPrescriptions(body) {
  return Array.isArray(body.prescriptions)
    ? body.prescriptions.filter((item) => item.medicine && item.dosage && item.schedule)
    : [];
}

router.get("/", authenticate, async (req, res) => {
  let filter = {};

  if (req.user.role === "patient") {
    filter = { patient: req.user._id };
  }

  if (req.user.role === "doctor") {
    const doctorProfile = await getDoctorProfile(req.user._id);
    filter = doctorProfile ? { doctor: doctorProfile._id } : { _id: null };
  }

  const records = await populateTreatment(TreatmentRecord.find(filter))
    .sort({ createdAt: -1 });

  res.json(records);
});

router.get("/:id", authenticate, async (req, res) => {
  const record = await populateTreatment(TreatmentRecord.findById(req.params.id));

  if (!record) {
    return res.status(404).json({ message: "Treatment record not found" });
  }

  if (!(await canAccessTreatment(req.user, record))) {
    return res.status(403).json({ message: "You do not have permission to access this treatment record" });
  }

  res.json(record);
});

router.post("/", authenticate, authorize("doctor", "admin"), async (req, res) => {
  if (!req.body.appointment || !req.body.checkupNotes) {
    return res.status(400).json({ message: "appointment and checkupNotes are required" });
  }

  if (req.body.status && !treatmentStatuses.includes(req.body.status)) {
    return res.status(400).json({ message: "status must be active, follow-up, or completed" });
  }

  const appointment = await Appointment.findById(req.body.appointment);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (appointment.status !== "confirmed") {
    return res.status(400).json({ message: "Treatment can only start after appointment confirmation" });
  }

  if (!appointment.doctor) {
    return res.status(400).json({ message: "Appointment must have an assigned doctor" });
  }

  if (req.user.role === "doctor") {
    const doctorProfile = await getDoctorProfile(req.user._id);

    if (!doctorProfile || doctorProfile._id.toString() !== appointment.doctor.toString()) {
      return res.status(403).json({ message: "Only the assigned doctor can start this treatment" });
    }
  }

  const existingRecord = await TreatmentRecord.findOne({ appointment: appointment._id });

  if (existingRecord) {
    return res.status(409).json({ message: "Treatment has already started for this appointment" });
  }

  const status = req.body.status || "active";
  const followUpDate = req.body.followUpDate ? new Date(req.body.followUpDate) : undefined;

  if (followUpDate && Number.isNaN(followUpDate.getTime())) {
    return res.status(400).json({ message: "followUpDate must be a valid date" });
  }

  const firstVisit = {
    visitDate: req.body.visitDate ? new Date(req.body.visitDate) : new Date(),
    checkupNotes: req.body.checkupNotes,
    diagnosis: req.body.diagnosis,
    physicalCheckup: buildPhysicalCheckup(req.body),
    prescriptions: buildPrescriptions(req.body),
    followUpDate,
    statusAfterVisit: status
  };

  if (Number.isNaN(firstVisit.visitDate.getTime())) {
    return res.status(400).json({ message: "visitDate must be a valid date" });
  }

  const record = await TreatmentRecord.create({
    patient: appointment.patient,
    doctor: appointment.doctor,
    appointment: appointment._id,
    checkupNotes: req.body.checkupNotes,
    diagnosis: req.body.diagnosis,
    physicalCheckup: firstVisit.physicalCheckup,
    prescriptions: firstVisit.prescriptions,
    followUpDate,
    status,
    progressNotes: req.body.progressNotes,
    followUpVisits: followUpDate ? [{ visitDate: followUpDate, notes: req.body.followUpNotes, statusAfterVisit: "follow-up" }] : [],
    visits: [firstVisit]
  });

  if (status === "completed") {
    appointment.status = "completed";
    await appointment.save();
  }

  await createMedicationReminderNotifications(appointment.patient, firstVisit.prescriptions, firstVisit.visitDate);

  if (followUpDate) {
    await createFollowUpReminderNotifications(appointment.patient, followUpDate, req.body.followUpNotes);
  }

  const populatedRecord = await populateTreatment(TreatmentRecord.findById(record._id));
  res.status(201).json(populatedRecord);
});

router.post("/:id/visits", authenticate, authorize("doctor", "admin"), async (req, res) => {
  if (!req.body.checkupNotes || !req.body.statusAfterVisit) {
    return res.status(400).json({ message: "checkupNotes and statusAfterVisit are required" });
  }

  if (!treatmentStatuses.includes(req.body.statusAfterVisit)) {
    return res.status(400).json({ message: "statusAfterVisit must be active, follow-up, or completed" });
  }

  const record = await TreatmentRecord.findById(req.params.id);

  if (!record) {
    return res.status(404).json({ message: "Treatment record not found" });
  }

  if (!(await canAccessTreatment(req.user, record)) || req.user.role === "patient") {
    return res.status(403).json({ message: "You do not have permission to update this treatment" });
  }

  const visitDate = req.body.visitDate ? new Date(req.body.visitDate) : new Date();
  const followUpDate = req.body.followUpDate ? new Date(req.body.followUpDate) : undefined;

  if (Number.isNaN(visitDate.getTime())) {
    return res.status(400).json({ message: "visitDate must be a valid date" });
  }

  if (followUpDate && Number.isNaN(followUpDate.getTime())) {
    return res.status(400).json({ message: "followUpDate must be a valid date" });
  }

  const visit = {
    visitDate,
    checkupNotes: req.body.checkupNotes,
    diagnosis: req.body.diagnosis,
    physicalCheckup: buildPhysicalCheckup(req.body),
    prescriptions: buildPrescriptions(req.body),
    followUpDate,
    statusAfterVisit: req.body.statusAfterVisit
  };

  record.visits.push(visit);
  record.checkupNotes = req.body.checkupNotes;
  record.diagnosis = req.body.diagnosis ?? record.diagnosis;
  record.physicalCheckup = visit.physicalCheckup;
  record.prescriptions = visit.prescriptions;
  record.followUpDate = followUpDate;
  record.status = req.body.statusAfterVisit;
  record.progressNotes = req.body.progressNotes ?? record.progressNotes;

  if (followUpDate) {
    record.followUpVisits.push({
      visitDate: followUpDate,
      notes: req.body.followUpNotes,
      statusAfterVisit: "follow-up"
    });
  }

  await record.save();

  if (record.status === "completed") {
    await Appointment.findByIdAndUpdate(record.appointment, { status: "completed" });
  }

  await createMedicationReminderNotifications(record.patient, visit.prescriptions, visit.visitDate);

  if (followUpDate) {
    await createFollowUpReminderNotifications(record.patient, followUpDate, req.body.followUpNotes);
  }

  const populatedRecord = await populateTreatment(TreatmentRecord.findById(record._id));
  res.status(201).json(populatedRecord);
});

export default router;
