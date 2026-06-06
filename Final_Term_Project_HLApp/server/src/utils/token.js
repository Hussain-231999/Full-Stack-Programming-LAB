import jwt from "jsonwebtoken";

export function signToken(user) {
  return jwt.sign(
    {
      role: user.role,
      tokenVersion: user.tokenVersion || 0
    },
    process.env.JWT_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
}
