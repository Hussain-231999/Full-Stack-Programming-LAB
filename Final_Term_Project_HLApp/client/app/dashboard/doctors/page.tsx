"use client";

import { AdminManagement } from "@/components/admin-management";
import { DashboardGate } from "@/components/dashboard-gate";
import { useAuth } from "@/context/auth-context";

function DoctorsContent() {
  const { token } = useAuth();

  return token ? <AdminManagement token={token} mode="doctors" /> : null;
}

export default function DoctorsPage() {
  return (
    <DashboardGate allowedRoles={["admin"]}>
      <DoctorsContent />
    </DashboardGate>
  );
}
