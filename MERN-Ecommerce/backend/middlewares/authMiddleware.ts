import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";
import User from "../models/userModel";
import asyncHandler from "./asyncHandler";

type AuthenticatedUser = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  isAdmin: boolean;
};

type AuthTokenPayload = JwtPayload & {
  userId: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

const hasUserId = (
  decoded: string | JwtPayload,
): decoded is AuthTokenPayload => {
  return typeof decoded !== "string" && typeof decoded.userId === "string";
};

const authenticate = asyncHandler(
  async (req, res, next): Promise<void> => {
    const token: unknown = req.cookies?.jwt;

    if (typeof token !== "string" || !token) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    let decoded: string | JwtPayload;

    try {
      decoded = jwt.verify(token, secret);
    } catch {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }

    if (!hasUserId(decoded)) {
      res.status(401).json({ message: "Not authorized, invalid token payload" });
      return;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({ message: "Not authorized, user not found" });
      return;
    }

    req.user = user;
    next();
  },
);

// Check for the admin
const authorizeAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  if (req.user.isAdmin) {
    next();
    return;
  }

  res.status(403).json({ message: "Not authorized as an admin" });
};

export { authenticate, authorizeAdmin };
