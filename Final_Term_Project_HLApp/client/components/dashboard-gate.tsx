"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function DashboardGate({
  allowedRoles,
  children
}: {
  allowedRoles?: string[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, router, token]);

  if (isLoading || !user || !token) {
    return <p className="loading-state">Checking secure session...</p>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <p className="form-error">You do not have permission to access this page.</p>;
  }

  return <>{children}</>;
}
