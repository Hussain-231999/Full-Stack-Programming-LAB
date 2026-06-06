import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database.js";
import Doctor from "../src/models/Doctor.js";
import Patient from "../src/models/Patient.js";
import User from "../src/models/User.js";

dotenv.config();

const password = "SeedPass123!";

const doctors = [
  ["Dr. Ayesha Khan", "ayesha.khan", "0301-4422110", "Cardiology", "MBBS, FCPS Cardiology", 12, "Cardiology", 2500, ["Monday", "Wednesday", "Friday"]],
  ["Dr. Bilal Ahmed", "bilal.ahmed", "0302-5511902", "Neurology", "MBBS, FCPS Neurology", 10, "Neurology", 3000, ["Tuesday", "Thursday", "Saturday"]],
  ["Dr. Sana Malik", "sana.malik", "0303-6182940", "Pediatrics", "MBBS, FCPS Pediatrics", 8, "Child Care", 1800, ["Monday", "Tuesday", "Thursday"]],
  ["Dr. Usman Raza", "usman.raza", "0304-7188321", "Orthopedics", "MBBS, MS Orthopedics", 14, "Orthopedics", 2800, ["Wednesday", "Friday", "Saturday"]],
  ["Dr. Hina Siddiqui", "hina.siddiqui", "0305-2289144", "Dermatology", "MBBS, MCPS Dermatology", 7, "Dermatology", 2200, ["Monday", "Thursday", "Saturday"]],
  ["Dr. Imran Qureshi", "imran.qureshi", "0306-3378001", "General Medicine", "MBBS, FCPS Medicine", 15, "Medicine", 2000, ["Monday", "Wednesday", "Friday"]],
  ["Dr. Nadia Farooq", "nadia.farooq", "0307-4921811", "Gynecology", "MBBS, FCPS Gynecology", 11, "Gynecology", 2600, ["Tuesday", "Thursday", "Saturday"]],
  ["Dr. Hamza Tariq", "hamza.tariq", "0308-8227105", "ENT", "MBBS, FCPS ENT", 6, "ENT", 1600, ["Monday", "Wednesday", "Saturday"]],
  ["Dr. Fatima Noor", "fatima.noor", "0309-7192048", "Ophthalmology", "MBBS, FCPS Ophthalmology", 9, "Eye Care", 2100, ["Tuesday", "Wednesday", "Friday"]],
  ["Dr. Kamran Ali", "kamran.ali", "0310-9156004", "Psychiatry", "MBBS, FCPS Psychiatry", 13, "Psychiatry", 2400, ["Monday", "Thursday", "Friday"]],
  ["Dr. Maryam Iqbal", "maryam.iqbal", "0311-3201875", "Radiology", "MBBS, FCPS Radiology", 10, "Radiology", 2300, ["Tuesday", "Wednesday", "Saturday"]],
  ["Dr. Faisal Mehmood", "faisal.mehmood", "0312-6409822", "Urology", "MBBS, MS Urology", 12, "Urology", 2700, ["Monday", "Wednesday", "Friday"]],
  ["Dr. Rabia Aslam", "rabia.aslam", "0313-7391804", "Endocrinology", "MBBS, FCPS Endocrinology", 8, "Endocrinology", 2500, ["Tuesday", "Thursday", "Saturday"]],
  ["Dr. Saad Javed", "saad.javed", "0314-5092329", "Pulmonology", "MBBS, FCPS Pulmonology", 9, "Pulmonology", 2400, ["Monday", "Wednesday", "Thursday"]],
  ["Dr. Zainab Shah", "zainab.shah", "0315-9024407", "Dentistry", "BDS, FCPS Dentistry", 6, "Dental Care", 1500, ["Tuesday", "Friday", "Saturday"]]
];

const patients = [
  ["Ahmed Hassan", "ahmed.hassan", "0321-1122334", 34, "male", "B+", "House 12, G-10", "Islamabad", "0300-7711223", "Hypertension"],
  ["Fatima Zahra", "fatima.zahra", "0322-4421980", 27, "female", "O+", "Street 5, Model Town", "Lahore", "0301-8822119", "Seasonal allergies"],
  ["Muhammad Ali", "muhammad.ali", "0323-1189204", 45, "male", "A+", "Block 7, Gulshan-e-Iqbal", "Karachi", "0302-9900881", "Diabetes type 2"],
  ["Saira Bibi", "saira.bibi", "0324-3344556", 52, "female", "AB+", "Satellite Town", "Rawalpindi", "0303-4401928", "Arthritis"],
  ["Hassan Raza", "hassan.raza", "0325-6655443", 19, "male", "O-", "University Road", "Peshawar", "0304-1182934", "Asthma"],
  ["Amina Yousaf", "amina.yousaf", "0326-7182930", 31, "female", "A-", "Cantt Area", "Multan", "0305-5519827", "Migraine"],
  ["Usman Khalid", "usman.khalid", "0327-9281746", 41, "male", "B-", "Peoples Colony", "Faisalabad", "0306-6627183", "High cholesterol"],
  ["Nimra Sheikh", "nimra.sheikh", "0328-1029384", 24, "female", "AB-", "Qasimabad", "Hyderabad", "0307-7788912", "No known chronic illness"],
  ["Bilal Akram", "bilal.akram", "0329-6677881", 38, "male", "O+", "Jinnah Town", "Quetta", "0308-1290873", "Back pain"],
  ["Mehwish Iqbal", "mehwish.iqbal", "0330-5566778", 29, "female", "A+", "Saddar", "Sialkot", "0309-6678129", "Anemia"],
  ["Zeeshan Ahmed", "zeeshan.ahmed", "0331-2233445", 56, "male", "B+", "Civil Lines", "Gujranwala", "0310-4499001", "Cardiac follow-up"],
  ["Khadija Noor", "khadija.noor", "0332-7744112", 36, "female", "O-", "Bahria Town", "Islamabad", "0311-7738291", "Thyroid disorder"],
  ["Danish Farooq", "danish.farooq", "0333-9821734", 22, "male", "AB+", "Defence Road", "Lahore", "0312-3382716", "Sports injury"],
  ["Iqra Saleem", "iqra.saleem", "0334-1119283", 47, "female", "A-", "North Nazimabad", "Karachi", "0313-2291880", "Blood pressure monitoring"],
  ["Omar Siddiqui", "omar.siddiqui", "0335-7162538", 63, "male", "B-", "Chaklala Scheme", "Rawalpindi", "0314-8812009", "Respiratory checkups"]
];

function email(localPart, role) {
  return `${localPart}.${role}@hospital.test`;
}

async function seed() {
  await connectDatabase();

  const seedEmails = [
    ...doctors.map((doctor) => email(doctor[1], "doctor")),
    ...patients.map((patient) => email(patient[1], "patient"))
  ];
  const seedUsers = await User.find({ email: { $in: seedEmails } });
  const seedUserIds = seedUsers.map((user) => user._id);

  await Doctor.deleteMany({ user: { $in: seedUserIds } });
  await Patient.deleteMany({ user: { $in: seedUserIds } });
  await User.deleteMany({ email: { $in: seedEmails } });

  const createdDoctors = [];

  for (const doctor of doctors) {
    const [name, localPart, phone, specialty, qualification, experienceYears, hospitalDepartment, consultationFee, availableDays] = doctor;
    const user = await User.create({
      name,
      email: email(localPart, "doctor"),
      phone,
      password,
      role: "doctor"
    });
    const doctorProfile = await Doctor.create({
      user: user._id,
      specialty,
      qualification,
      experienceYears,
      hospitalDepartment,
      consultationFee,
      availableDays,
      approvalStatus: "approved",
      isActive: true
    });

    createdDoctors.push(doctorProfile);
  }

  for (const [index, patient] of patients.entries()) {
    const [name, localPart, phone, age, gender, bloodGroup, address, city, emergencyContact, medicalHistory] = patient;
    const user = await User.create({
      name,
      email: email(localPart, "patient"),
      phone,
      password,
      role: "patient"
    });

    await Patient.create({
      user: user._id,
      assignedDoctor: createdDoctors[index % createdDoctors.length]._id,
      age,
      gender,
      bloodGroup,
      address,
      city,
      emergencyContact,
      medicalHistory
    });
  }

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
