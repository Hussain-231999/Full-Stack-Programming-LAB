import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import { ToastProvider } from "@/context/toast-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthcare Appointment System",
  description: "Secure appointments, treatment tracking, prescriptions, and follow-ups."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
