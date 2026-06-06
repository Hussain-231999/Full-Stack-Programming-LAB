"use client";

import { DashboardGate } from "@/components/dashboard-gate";
import { TreatmentLifecycle } from "@/components/treatment-lifecycle";
import { useAuth } from "@/context/auth-context";

function TreatmentsContent() {
  const { token, user } = useAuth();

  return token && user ? <TreatmentLifecycle role={user.role} token={token} mode="treatments" /> : null;
}

export default function TreatmentsPage() {
  return (
    <DashboardGate>
      <TreatmentsContent />
    </DashboardGate>
  );
}
