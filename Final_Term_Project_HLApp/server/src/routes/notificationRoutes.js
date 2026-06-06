import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import Notification from "../models/Notification.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const filter = req.user.role === "patient" ? { user: req.user._id } : {};
  const notifications = await Notification.find(filter).sort({ scheduledFor: 1 });

  res.json(notifications);
});

router.post("/", authenticate, authorize("admin", "doctor"), async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json(notification);
});

export default router;

