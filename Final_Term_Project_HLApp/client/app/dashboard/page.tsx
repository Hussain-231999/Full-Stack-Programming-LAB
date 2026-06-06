"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ClipboardList, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { DashboardGate } from "@/components/dashboard-gate";
import { ProfileCompletion } from "@/components/profile-completion";
import { useAuth } from "@/context/auth-context";
import { apiRequest, DoctorRecord, PatientRecord, Role } from "@/lib/api";

const roleContent = {
  admin: {
    title: "Admin Dashboard",
    description: "Review hospital activity and manage doctor, patient, appointment, and treatment modules.",
    icon: ShieldCheck,
    items: ["Doctor management", "Patient records", "Appointment queue", "Treatment oversight"]
  },
  doctor: {
    title: "Doctor Dashboard",
    description: "Track assigned patients, upcoming appointments, and active treatment work.",
    icon: Stethoscope,
    items: ["Assigned appointments", "Patient checkups", "Prescriptions", "Follow-up visits"]
  },
  patient: {
    title: "Patient Dashboard",
    description: "View your doctor assignment, appointments, treatment history, and reminders.",
    icon: Users,
    items: ["Book appointments", "Treatment history", "Medication reminders", "Follow-up visits"]
  }
};

type DashboardAccess = {
  role: Role;
  permissions: string[];
  profileStatus?: "active" | "missing-profile" | "pending" | "approved" | "rejected";
  doctorProfile?: DoctorRecord | null;
  patientProfile?: PatientRecord | null;
  assignedDoctor?: DoctorRecord | null;
  assignedPatients?: PatientRecord[];
};

function OverviewContent() {
  const { user, token } = useAuth();
  const [access, setAccess] = useState<DashboardAccess | null>(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    apiRequest<DashboardAccess>(`/dashboard/${user.role}`, { token })
      .then(setAccess)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : "Dashboard access failed");
      });
  }, [reloadKey, token, user]);

  const content = useMemo(() => user ? roleContent[user.role] : null, [user]);

  if (!user || !token || !content) {
    return null;
  }

  const Icon = content.icon;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Authenticated as {user.role}</p>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </header>

      <section className="dashboard-summary">
        <div className="profile-block">
          <Icon aria-hidden="true" />
          <div>
            <span>{user.name}</span>
            <strong>{user.email}</strong>
          </div>
        </div>
        <div className="metric-block">
          <CalendarDays aria-hidden="true" />
          <span>Protected Dashboard Active!</span>
        </div>
        <div className="metric-block">
          <ClipboardList aria-hidden="true" />
          <span>JWT verified by API</span>
        </div>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="permission-grid">
        {content.items.map((item) => (
          <article key={item} className="permission-card">
            <ShieldCheck aria-hidden="true" />
            <h2>{item}</h2>
            <p>Available for {user.role} role.</p>
          </article>
        ))}
      </section>

      {user.role === "patient" && access?.profileStatus === "missing-profile" ? (
        <ProfileCompletion role="patient" token={token} onCompleted={() => setReloadKey((key) => key + 1)} />
      ) : null}

      {user.role === "doctor" && access?.profileStatus === "missing-profile" ? (
        <ProfileCompletion role="doctor" token={token} onCompleted={() => setReloadKey((key) => key + 1)} />
      ) : null}

      {user.role === "doctor" && access?.profileStatus === "pending" ? (
        <section className="assignment-section">
          <h2>Approval Pending</h2>
          <p className="empty-state">Your doctor profile has been submitted and is waiting for admin approval.</p>
        </section>
      ) : null}

      {user.role === "doctor" && access?.profileStatus === "rejected" ? (
        <section className="assignment-section">
          <h2>Profile Rejected</h2>
          <p className="empty-state">Your doctor profile was rejected. Contact hospital administration for review.</p>
        </section>
      ) : null}

      {user.role === "patient" && access?.profileStatus !== "missing-profile" ? (
        <section className="assignment-section">
          <h2>Assigned Doctor</h2>
          {access?.assignedDoctor ? (
            <article className="assignment-card">
              <strong>{access.assignedDoctor.user.name}</strong>
              <span>{access.assignedDoctor.specialty}</span>
              <span>{access.assignedDoctor.qualification}</span>
              <span>{access.assignedDoctor.user.phone}</span>
              <span>Fee: Rs. {access.assignedDoctor.consultationFee}</span>
            </article>
          ) : (
            <p className="empty-state">No doctor assigned yet.</p>
          )}
        </section>
      ) : null}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardGate>
      <OverviewContent />
    </DashboardGate>
  );
}
