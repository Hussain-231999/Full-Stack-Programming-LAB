"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CalendarDays, ClipboardList, HeartPulse, Home, LogOut, Stethoscope, UserRound, Users } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Role } from "@/lib/api";

const links: Record<Role, { href: string; label: string; icon: typeof Home }[]> = {
  admin: [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/dashboard/patients", label: "Patients", icon: Users },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/treatments", label: "Treatments", icon: HeartPulse },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell }
  ],
  doctor: [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/patients", label: "Patients", icon: Users },
    { href: "/dashboard/treatments", label: "Treatments", icon: HeartPulse },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell }
  ],
  patient: [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
    { href: "/dashboard/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/dashboard/treatments", label: "Treatments", icon: ClipboardList },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell }
  ]
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const roleLinks = user ? links[user.role] : links.patient;

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span>Healthcare App</span>
          <strong>{user?.role || "secure"}</strong>
        </div>
        <nav className="sidebar-nav">
          {roleLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link className={active ? "sidebar-link active" : "sidebar-link"} href={item.href} key={item.href}>
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button className="sidebar-logout" type="button" onClick={logout}>
          <LogOut aria-hidden="true" />
          Logout
        </button>
      </aside>
      <section className="dashboard-content">{children}</section>
    </main>
  );
}
