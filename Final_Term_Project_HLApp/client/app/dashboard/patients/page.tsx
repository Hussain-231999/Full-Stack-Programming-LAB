"use client";

import { useEffect, useState } from "react";
import { AdminManagement } from "@/components/admin-management";
import { DashboardGate } from "@/components/dashboard-gate";
import { useAuth } from "@/context/auth-context";
import { apiRequest, PatientRecord } from "@/lib/api";

function AssignedPatients() {
  const { token, user } = useAuth();
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || user?.role !== "doctor") {
      return;
    }

    apiRequest<{ assignedPatients: PatientRecord[] }>("/dashboard/doctor", { token })
      .then((data) => setPatients(data.assignedPatients || []))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load assigned patients"));
  }, [token, user]);

  return (
    <section className="management-section">
      <div className="management-heading">
        <div>
          <p className="eyebrow">Doctor workspace</p>
          <h2>Assigned Patients</h2>
        </div>
        <div className="record-counts"><span>{patients.length} patients</span></div>
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="assigned-patient-grid">
        {patients.length === 0 ? <p className="empty-state">No patients assigned yet.</p> : null}
        {patients.map((patient) => (
          <article className="assignment-card" key={patient._id}>
            <strong>{patient.user.name}</strong>
            <span>{patient.age} years - {patient.gender} - {patient.bloodGroup}</span>
            <span>{patient.user.email}</span>
            <span>{patient.user.phone}</span>
            <span>{patient.address}, {patient.city}</span>
            <span>Emergency: {patient.emergencyContact}</span>
            <span>History: {patient.medicalHistory || "None"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PatientsContent() {
  const { token, user } = useAuth();

  if (!token || !user) {
    return null;
  }

  return user.role === "admin" ? <AdminManagement token={token} mode="patients" /> : <AssignedPatients />;
}

export default function PatientsPage() {
  return (
    <DashboardGate allowedRoles={["admin", "doctor"]}>
      <PatientsContent />
    </DashboardGate>
  );
}
