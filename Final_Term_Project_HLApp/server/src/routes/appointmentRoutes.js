import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import { createAppointmentConfirmationNotifications } from "../utils/notifications.js";

const router = Router();

async function getDoctorProfile(userId) {
  return Doctor.findOne({ user: userId, approvalStatus: "approved", isActive: true });
}

async function canManageAppointment(user, appointment) {
  if (user.role === "admin") {
    return true;
  }

  if (user.role !== "doctor" || !appointment.doctor) {
    return false;
  }

  const doctorProfile = await getDoctorProfile(user._id);
  return doctorProfile?._id.toString() === appointment.doctor.toString();
}

function populateAppointment(query) {
  return query
    .populate("patient", "name email phone")
    .populate({ path: "doctor", populate: { path: "user", select: "name email phone" } });
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

  const appointments = await populateAppointment(Appointment.find(filter))
    .sort({ requestedAt: 1 });

  res.json(appointments);
});

router.post("/", authenticate, authorize("patient"), async (req, res) => {
  if (!req.body.symptoms || !req.body.requestedAt) {
    return res.status(400).json({ message: "Symptoms and requestedAt are required" });
  }

  const requestedAt = new Date(req.body.requestedAt);

  if (Number.isNaN(requestedAt.getTime())) {
    return res.status(400).json({ message: "requestedAt must be a valid date" });
  }

  if (req.body.doctor) {
    const doctor = await Doctor.findOne({
      _id: req.body.doctor,
      approvalStatus: "approved",
      isActive: true
    });

    if (!doctor) {
      return res.status(404).json({ message: "Approved active doctor not found" });
    }
  }

  const patientProfile = await Patient.findOne({ user: req.user._id });

  if (!patientProfile) {
    return res.status(400).json({ message: "Complete your patient profile before booking appointments" });
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: req.body.doctor || undefined,
    symptoms: req.body.symptoms,
    requestedAt,
    notes: req.body.notes
  });

  const populatedAppointment = await populateAppointment(Appointment.findById(appointment._id));
  res.status(201).json(populatedAppointment);
});

router.patch("/:id/assign-doctor", authenticate, authorize("admin"), async (req, res) => {
  if (!req.body.doctor) {
    return res.status(400).json({ message: "doctor is required" });
  }

  const doctor = await Doctor.findOne({
    _id: req.body.doctor,
    approvalStatus: "approved",
    isActive: true
  });

  if (!doctor) {
    return res.status(404).json({ message: "Approved active doctor not found" });
  }

  const appointment = await populateAppointment(Appointment.findByIdAndUpdate(
    req.params.id,
    { doctor: doctor._id, notes: req.body.notes },
    { new: true }
  ));

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.json(appointment);
});

router.patch("/:id/confirm", authenticate, authorize("admin", "doctor"), async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (!(await canManageAppointment(req.user, appointment))) {
    return res.status(403).json({ message: "You do not have permission to confirm this appointment" });
  }

  if (req.body.doctor) {
    const doctor = await Doctor.findOne({
      _id: req.body.doctor,
      approvalStatus: "approved",
      isActive: true
    });

    if (!doctor) {
      return res.status(404).json({ message: "Approved active doctor not found" });
    }

    appointment.doctor = doctor._id;
  }

  if (!appointment.doctor) {
    return res.status(400).json({ message: "Assign a doctor before confirming the appointment" });
  }

  appointment.status = "confirmed";
  appointment.notes = req.body.notes ?? appointment.notes;
  await appointment.save();

  const populatedAppointment = await populateAppointment(Appointment.findById(appointment._id));
  await createAppointmentConfirmationNotifications(populatedAppointment);
  res.json(populatedAppointment);
});

router.patch("/:id/reject", authenticate, authorize("admin", "doctor"), async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (!(await canManageAppointment(req.user, appointment))) {
    return res.status(403).json({ message: "You do not have permission to reject this appointment" });
  }

  appointment.status = "rejected";
  appointment.notes = req.body.notes ?? appointment.notes;
  await appointment.save();

  const populatedAppointment = await populateAppointment(Appointment.findById(appointment._id));
  res.json(populatedAppointment);
});

export default router;
