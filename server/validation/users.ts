import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";

export const validateUpdateData = (req: Request, res: Response, next: NextFunction) => {
  const validation = new Validator(req.body, {
    username: ["required", "string"],
    profession: ["required", "string"],
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
