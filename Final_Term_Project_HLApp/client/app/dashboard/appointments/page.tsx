"use client";

import { DashboardGate } from "@/components/dashboard-gate";
import { TreatmentLifecycle } from "@/components/treatment-lifecycle";
import { useAuth } from "@/context/auth-context";

function AppointmentsContent() {
  const { token, user } = useAuth();

  return token && user ? <TreatmentLifecycle role={user.role} token={token} mode="appointments" /> : null;
}

export default function AppointmentsPage() {
  return (
    <DashboardGate>
      <AppointmentsContent />
    </DashboardGate>
  );
}
