"use client";

import { useEffect, useState } from "react";
import { DashboardGate } from "@/components/dashboard-gate";
import { ProfileCompletion } from "@/components/profile-completion";
import { useAuth } from "@/context/auth-context";
import { apiRequest, DoctorRecord, PatientRecord, Role } from "@/lib/api";

type DashboardAccess = {
  role: Role;
  profileStatus?: "active" | "missing-profile" | "pending" | "approved" | "rejected";
  doctorProfile?: DoctorRecord | null;
  patientProfile?: PatientRecord | null;
  assignedDoctor?: DoctorRecord | null;
};

function ProfileContent() {
  const { token, user } = useAuth();
  const [access, setAccess] = useState<DashboardAccess | null>(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!token || !user || user.role === "admin") {
      return;
    }

    apiRequest<DashboardAccess>(`/dashboard/${user.role}`, { token })
      .then(setAccess)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load profile"));
  }, [reloadKey, token, user]);

  if (!token || !user) {
    return null;
  }

  if (user.role === "admin") {
    return <p className="empty-state">Admin profile is managed through the user account.</p>;
  }

  return (
    <section className="management-section">
      <div className="management-heading">
        <div>
          <p className="eyebrow">Account details</p>
          <h2>{user.role === "doctor" ? "Doctor Profile" : "Patient Profile"}</h2>
        </div>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {access?.profileStatus === "missing-profile" ? (
        <ProfileCompletion role={user.role} token={token} onCompleted={() => setReloadKey((key) => key + 1)} />
      ) : user.role === "patient" && access?.patientProfile ? (
        <article className="assignment-card">
          <strong>{access.patientProfile.user.name}</strong>
          <span>{access.patientProfile.user.email}</span>
          <span>Status: {access?.profileStatus || "active"}</span>
          <span>Phone: {access.patientProfile.user.phone || "Not recorded"}</span>
          <span>Age: {access.patientProfile.age}</span>
          <span>Gender: {access.patientProfile.gender}</span>
          <span>Blood group: {access.patientProfile.bloodGroup}</span>
          <span>Address: {access.patientProfile.address}, {access.patientProfile.city}</span>
          <span>Emergency contact: {access.patientProfile.emergencyContact}</span>
          <span>Medical history: {access.patientProfile.medicalHistory || "None"}</span>
          <span>Assigned doctor: {access?.assignedDoctor?.user.name || "Not assigned"}</span>
        </article>
      ) : user.role === "doctor" && access?.doctorProfile ? (
        <article className="assignment-card">
          <strong>{access.doctorProfile.user.name}</strong>
          <span>{access.doctorProfile.user.email}</span>
          <span>Status: {access?.profileStatus || "active"}</span>
          <span>Phone: {access.doctorProfile.user.phone || "Not recorded"}</span>
          <span>Specialty: {access.doctorProfile.specialty}</span>
          <span>Qualification: {access.doctorProfile.qualification}</span>
          <span>Experience: {access.doctorProfile.experienceYears} years</span>
          <span>Department: {access.doctorProfile.hospitalDepartment}</span>
          <span>Fee: Rs. {access.doctorProfile.consultationFee}</span>
          <span>Available days: {access.doctorProfile.availableDays.join(", ") || "Not recorded"}</span>
        </article>
      ) : (
        <article className="assignment-card">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
          <span>Status: {access?.profileStatus || "active"}</span>
        </article>
      )}
    </section>
  );
}

export default function ProfilePage() {
  return (
    <DashboardGate allowedRoles={["doctor", "patient"]}>
      <ProfileContent />
    </DashboardGate>
  );
}
