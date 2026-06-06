import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database.js";
import Doctor from "../src/models/Doctor.js";
import Patient from "../src/models/Patient.js";
import User from "../src/models/User.js";

dotenv.config();

const fixedAdmins = [
  {
    name: "Admin One",
    email: "admin1@hospital.test",
    phone: "0300-1000001",
    password: "Admin123!"
  },
  {
    name: "Admin Two",
    email: "admin2@hospital.test",
    phone: "0300-1000002",
    password: "Admin123!"
  }
];
const seedDoctorEmails = [
  "ayesha.khan.doctor@hospital.test",
  "bilal.ahmed.doctor@hospital.test",
  "sana.malik.doctor@hospital.test",
  "usman.raza.doctor@hospital.test",
  "hina.siddiqui.doctor@hospital.test",
  "imran.qureshi.doctor@hospital.test",
  "nadia.farooq.doctor@hospital.test",
  "hamza.tariq.doctor@hospital.test",
  "fatima.noor.doctor@hospital.test",
  "kamran.ali.doctor@hospital.test",
  "maryam.iqbal.doctor@hospital.test",
  "faisal.mehmood.doctor@hospital.test",
  "rabia.aslam.doctor@hospital.test",
  "saad.javed.doctor@hospital.test",
  "zainab.shah.doctor@hospital.test"
];
const seedPatientEmails = [
  "ahmed.hassan.patient@hospital.test",
  "fatima.zahra.patient@hospital.test",
  "muhammad.ali.patient@hospital.test",
  "saira.bibi.patient@hospital.test",
  "hassan.raza.patient@hospital.test",
  "amina.yousaf.patient@hospital.test",
  "usman.khalid.patient@hospital.test",
  "nimra.sheikh.patient@hospital.test",
  "bilal.akram.patient@hospital.test",
  "mehwish.iqbal.patient@hospital.test",
  "zeeshan.ahmed.patient@hospital.test",
  "khadija.noor.patient@hospital.test",
  "danish.farooq.patient@hospital.test",
  "iqra.saleem.patient@hospital.test",
  "omar.siddiqui.patient@hospital.test"
];

async function upsertFixedAdmins() {
  for (const admin of fixedAdmins) {
    const existingAdmin = await User.findOne({ email: admin.email }).select("+password");

    if (existingAdmin) {
      existingAdmin.name = admin.name;
      existingAdmin.phone = admin.phone;
      existingAdmin.role = "admin";
      existingAdmin.password = admin.password;
      existingAdmin.tokenVersion = (existingAdmin.tokenVersion || 0) + 1;
      await existingAdmin.save();
    } else {
      await User.create({ ...admin, role: "admin" });
    }
  }
}

async function normalize() {
  await connectDatabase();
  await upsertFixedAdmins();

  const fixedAdminEmails = fixedAdmins.map((admin) => admin.email);
  const extraAdmins = await User.find({ role: "admin", email: { $nin: fixedAdminEmails } });
  const extraAdminIds = extraAdmins.map((admin) => admin._id);

  if (extraAdminIds.length > 0) {
    await User.deleteMany({ _id: { $in: extraAdminIds } });
  }

  await Doctor.deleteMany({ user: { $exists: false } });
  await Patient.deleteMany({ user: { $exists: false } });

  const validUsers = await User.find().select("_id role");
  const validUserIds = new Set(validUsers.map((user) => user._id.toString()));

  const doctors = await Doctor.find();
  for (const doctor of doctors) {
    const user = validUsers.find((item) => item._id.toString() === doctor.user.toString());

    if (!user || user.role !== "doctor") {
      await doctor.deleteOne();
    }
  }

  const patients = await Patient.find();
  for (const patient of patients) {
    const user = validUsers.find((item) => item._id.toString() === patient.user.toString());

    if (!user || user.role !== "patient") {
      await patient.deleteOne();
    }
  }

  const validDoctorIds = new Set((await Doctor.find().select("_id")).map((doctor) => doctor._id.toString()));
  const seededDoctorUsers = await User.find({ email: { $in: seedDoctorEmails }, role: "doctor" }).select("_id");
  await Doctor.updateMany(
    { user: { $in: seededDoctorUsers.map((user) => user._id) } },
    { approvalStatus: "approved", isActive: true }
  );

  await Patient.updateMany(
    { assignedDoctor: { $exists: true, $nin: [...validDoctorIds] } },
    { $unset: { assignedDoctor: "" } }
  );

  const counts = {
    admins: await User.countDocuments({ role: "admin" }),
    doctors: await Doctor.countDocuments(),
    patients: await Patient.countDocuments(),
    doctorUsers: await User.countDocuments({ role: "doctor" }),
    patientUsers: await User.countDocuments({ role: "patient" })
  };

  console.log(JSON.stringify(counts, null, 2));
  console.log("Fixed admins: admin1@hospital.test, admin2@hospital.test");
  console.log("Fixed admin password: Admin123!");
  await mongoose.disconnect();
}

normalize().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
