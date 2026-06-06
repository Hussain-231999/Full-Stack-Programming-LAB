import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database.js";
import Doctor from "../src/models/Doctor.js";
import User from "../src/models/User.js";

dotenv.config();

const seededDoctorEmails = [
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

async function approveSeededDoctors() {
  await connectDatabase();
  const users = await User.find({ email: { $in: seededDoctorEmails }, role: "doctor" }).select("_id");
  const userIds = users.map((user) => user._id);
  const result = await Doctor.updateMany(
    { user: { $in: userIds } },
    { approvalStatus: "approved", isActive: true }
  );

  console.log(`Approved ${result.modifiedCount} seeded doctors.`);
  await mongoose.disconnect();
}

approveSeededDoctors().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

