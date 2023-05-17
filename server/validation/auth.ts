import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const validation = new Validator(req.body, {
    username: ["required", "string"],
    email: ["required", "email"],
    password: ["required", "string", "min:8", "max:32"],
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
