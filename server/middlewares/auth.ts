import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Get and verify the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    // Get user data from the token
    req.user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}
