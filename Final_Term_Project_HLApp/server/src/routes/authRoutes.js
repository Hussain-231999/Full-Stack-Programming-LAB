import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";
import { sanitizeUser } from "../utils/users.js";

const router = Router();
const publicRoles = ["doctor", "patient"];

router.post("/register", asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Name, email, password, and role are required" });
  }

  if (!publicRoles.includes(role)) {
    return res.status(400).json({ message: "Public registration is only available for doctor or patient users" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const user = await User.create({ name, email, phone, password, role });
  const token = signToken(user);

  res.status(201).json({
    token,
    user: sanitizeUser(user)
  });
}));

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user);

  res.json({
    token,
    user: sanitizeUser(user)
  });
}));

router.get("/me", authenticate, (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

router.post("/logout", authenticate, asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $inc: { tokenVersion: 1 } });
  res.json({ message: "Logged out successfully" });
}));

export default router;
