import cors from "cors";
import express from "express";
import morgan from "morgan";
import { getDatabaseStatus } from "./config/database.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import treatmentRoutes from "./routes/treatmentRoutes.js";

export function createApp() {
  const app = express();
  const allowedOrigins = [
    process.env.CLIENT_ORIGIN || "http://localhost:3000",
    "http://127.0.0.1:3000"
  ];

  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "healthcare-api", database: getDatabaseStatus() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/doctors", doctorRoutes);
  app.use("/api/patients", patientRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/treatments", treatmentRoutes);
  app.use("/api/notifications", notificationRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
  });

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}
