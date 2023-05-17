import { NextFunction, Request, Response } from "express";

export default async function authorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user || req.user.role !== "AUTHOR") {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
}
