import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";

export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = new Validator(req.body, {
    name: ["required", "string", "max:255"],
  });

  if (validation.fails()) {
    res.status(422).json({
      status: "error",
      message: "Validation failed",
      errors: validation.errors.all(),
    });
    return;
  }

  next();
};
