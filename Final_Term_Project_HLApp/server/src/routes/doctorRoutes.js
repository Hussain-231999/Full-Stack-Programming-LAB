import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import { isEmail, requireFields } from "../utils/validation.js";

const router = Router();
const requiredDoctorFields = [
  "name",
  "email",
  "password",
  "phone",
  "specialty",
  "qualification",
  "experienceYears",
  "hospitalDepartment",
  "consultationFee"
];
const selfProfileFields = [
  "phone",
  "specialty",
  "qualification",
  "experienceYears",
  "hospitalDepartment",
  "consultationFee"
];

function buildDoctorPayload(body) {
  return {
    specialty: body.specialty,
    qualification: body.qualification,
    experienceYears: Number(body.experienceYears),
    hospitalDepartment: body.hospitalDepartment,
    availableDays: Array.isArray(body.availableDays) ? body.availableDays : [],
    consultationFee: Number(body.consultationFee),
    approvalStatus: body.approvalStatus,
    isActive: body.isActive
  };
}

function validateDoctor(body, isUpdate = false) {
  if (!isUpdate) {
    const missingMessage = requireFields(body, requiredDoctorFields);

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

  if (body.experienceYears !== undefined && Number(body.experienceYears) < 0) {
    return "Experience years must be zero or greater";
  }

  if (body.consultationFee !== undefined && Number(body.consultationFee) < 0) {
    return "Consultation fee must be zero or greater";
  }

  return null;
}

function validateDoctorProfile(body) {
  const missingMessage = requireFields(body, selfProfileFields);

  if (missingMessage) {
    return missingMessage;
  }

  if (Number(body.experienceYears) < 0) {
    return "Experience years must be zero or greater";
  }

  if (Number(body.consultationFee) < 0) {
    return "Consultation fee must be zero or greater";
  }

  return null;
}

router.get("/", authenticate, asyncHandler(async (_req, res) => {
  const doctors = await Doctor.find()
    .populate("user", "name email phone role")
    .sort({ createdAt: -1 });

  res.json(doctors);
}));

router.post("/me/profile", authenticate, authorize("doctor"), asyncHandler(async (req, res) => {
  const existingProfile = await Doctor.findOne({ user: req.user._id });

  if (existingProfile) {
    return res.status(409).json({ message: "Doctor profile already exists" });
  }

  const validationError = validateDoctorProfile(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  if (req.body.phone) {
    await User.findByIdAndUpdate(req.user._id, { phone: req.body.phone });
  }

  const doctor = await Doctor.create({
    user: req.user._id,
    ...buildDoctorPayload(req.body),
    approvalStatus: "pending",
    isActive: false
  });
  const populatedDoctor = await Doctor.findById(doctor._id).populate("user", "name email phone role");

  res.status(201).json(populatedDoctor);
}));

router.get("/:id", authenticate, asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate("user", "name email phone role");

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.json(doctor);
}));

router.post("/", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const validationError = validateDoctor(req.body);

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
    role: "doctor"
  });
  const doctor = await Doctor.create({
    user: user._id,
    ...buildDoctorPayload(req.body),
    approvalStatus: req.body.approvalStatus || "approved",
    isActive: req.body.isActive ?? true
  });
  const populatedDoctor = await Doctor.findById(doctor._id).populate("user", "name email phone role");

  res.status(201).json(populatedDoctor);
}));

router.patch("/:id", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const validationError = validateDoctor(req.body, true);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  const doctorUpdates = buildDoctorPayload({ ...doctor.toObject(), ...req.body });
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
      ? await User.findOne({ email: userUpdates.email.toLowerCase(), _id: { $ne: doctor.user } })
      : null;

    if (duplicateUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.findById(doctor.user).select("+password");
    Object.assign(user, userUpdates);
    await user.save();
  }

  Object.assign(doctor, doctorUpdates);
  await doctor.save();

  const populatedDoctor = await Doctor.findById(doctor._id).populate("user", "name email phone role");
  res.json(populatedDoctor);
}));

router.patch("/:id/approval", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const { approvalStatus } = req.body;

  if (!["pending", "approved", "rejected"].includes(approvalStatus)) {
    return res.status(400).json({ message: "approvalStatus must be pending, approved, or rejected" });
  }

  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    {
      approvalStatus,
      isActive: approvalStatus === "approved"
    },
    { new: true }
  ).populate("user", "name email phone role");

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.json(doctor);
}));

router.delete("/:id", authenticate, authorize("admin"), asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  await Patient.updateMany({ assignedDoctor: doctor._id }, { $unset: { assignedDoctor: "" } });
  await User.findByIdAndDelete(doctor.user);
  await doctor.deleteOne();

  res.json({ message: "Doctor deleted successfully" });
}));

export default router;
