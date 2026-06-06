import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import { isEmail, requireFields } from "../utils/validation.js";

const router = Router();
const requiredPatientFields = [
  "name",
  "email",
  "password",
  "phone",
  "age",
  "gender",
  "bloodGroup",
  "address",
  "city",
  "emergencyContact"
];
const selfProfileFields = [
  "phone",
  "age",
  "gender",
  "bloodGroup",
  "address",
  "city",
  "emergencyContact"
];

function buildPatientPayload(body) {
  return {
    assignedDoctor: body.assignedDoctor || undefined,
    age: Number(body.age),
    gender: body.gender,
    bloodGroup: body.bloodGroup,
    address: body.address,
    city: body.city,
    emergencyContact: body.emergencyContact,
    medicalHistory: body.medicalHistory || "",
    isActive: body.isActive ?? true
  };
}

async function validatePatient(body, isUpdate = false) {
  if (!isUpdate) {
    const missingMessage = requireFields(body, requiredPatientFields);

    if (missingMessage) {
      return missingMessage;
    }
  }

  if (body.email && !isEmail(body.email)) {
    return "Email must be valid";
  }

  if (body.password && body.password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (body.age !== undefined && (Number(body.age) < 0 || Number(body.age) > 120)) {
    return "Age must be between 0 and 120";
  }

  if (body.assignedDoctor) {
    const doctor = await Doctor.findById(body.assignedDoctor);

    if (!doctor) {
      return "Assigned doctor does not exist";
    }
  }

  return null;
}

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const filter = req.user.role === "patient" ? { user: req.user._id } : {};
  const patients = await Patient.find(filter)
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } })
    .sort({ createdAt: -1 });

  res.json(patients);
}));

router.post("/me/profile", authenticate, authorize("patient"), asyncHandler(async (req, res) => {
  const existingProfile = await Patient.findOne({ user: req.user._id });

  if (existingProfile) {
    return res.status(409).json({ message: "Patient profile already exists" });
  }

  const missingMessage = requireFields(req.body, selfProfileFields);

  if (missingMessage) {
    return res.status(400).json({ message: missingMessage });
  }

  const validationError = await validatePatient(req.body, true);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  if (req.body.phone) {
    await User.findByIdAndUpdate(req.user._id, { phone: req.body.phone });
  }

  const patient = await Patient.create({ user: req.user._id, ...buildPatientPayload(req.body) });
  const populatedPatient = await Patient.findById(patient._id)
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  res.status(201).json(populatedPatient);
}));

router.get("/:id", authenticate, asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  if (req.user.role === "patient" && patient.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You do not have permission to access this patient" });
  }

  res.json(patient);
}));

router.post("/", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const validationError = await validatePatient(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: "patient"
  });
  const patient = await Patient.create({ user: user._id, ...buildPatientPayload(req.body) });
  const populatedPatient = await Patient.findById(patient._id)
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  res.status(201).json(populatedPatient);
}));

router.patch("/:id", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const validationError = await validatePatient(req.body, true);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const patientUpdates = buildPatientPayload({ ...patient.toObject(), ...req.body });
  const userUpdates = {};

  for (const field of ["name", "email", "phone"]) {
    if (req.body[field] !== undefined) {
      userUpdates[field] = req.body[field];
    }
  }

  if (req.body.password) {
    userUpdates.password = req.body.password;
  }

  if (Object.keys(userUpdates).length > 0) {
    const duplicateUser = userUpdates.email
      ? await User.findOne({ email: userUpdates.email.toLowerCase(), _id: { $ne: patient.user } })
      : null;

    if (duplicateUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.findById(patient.user).select("+password");
    Object.assign(user, userUpdates);
    await user.save();
  }

  Object.assign(patient, patientUpdates);
  await patient.save();

  const populatedPatient = await Patient.findById(patient._id)
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  res.json(populatedPatient);
}));

router.patch("/:id/assign-doctor", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  if (!req.body.doctorId) {
    return res.status(400).json({ message: "doctorId is required" });
  }

  const doctor = await Doctor.findOne({
    _id: req.body.doctorId,
    approvalStatus: "approved",
    isActive: true
  });

  if (!doctor) {
    return res.status(404).json({ message: "Approved active doctor not found" });
  }

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { assignedDoctor: doctor._id },
    { new: true }
  )
    .populate("user", "name email phone role")
    .populate({ path: "assignedDoctor", populate: { path: "user", select: "name email phone" } });

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.json(patient);
}));

router.delete("/:id", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  await User.findByIdAndDelete(patient.user);
  await patient.deleteOne();

  res.json({ message: "Patient deleted successfully" });
}));

export default router;
