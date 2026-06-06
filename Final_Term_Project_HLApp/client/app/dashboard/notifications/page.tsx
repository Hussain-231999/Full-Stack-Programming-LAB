"use client";

import { DashboardGate } from "@/components/dashboard-gate";
import { NotificationPanel } from "@/components/notification-panel";
import { useAuth } from "@/context/auth-context";

function NotificationsContent() {
  const { token } = useAuth();

  return token ? <NotificationPanel token={token} /> : null;
}

export default function NotificationsPage() {
  return (
    <DashboardGate>
      <NotificationsContent />
    </DashboardGate>
  );
}
