import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";

export const validateCreateArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = new Validator(req.body, {
    title: ["required", "string", "max:255"],
    content: ["required", "string"],
    categoryIds: ["required", "array"],
    "categoryIds.*": ["required", "integer"],
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

export const validateUpdateArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = new Validator(req.body, {
    title: ["string", "max:255"],
    content: ["string"],
    categoryIds: ["array"],
    "categoryIds.*": ["integer"],
    published: ["boolean"],
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

export const validateCreateComment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = new Validator(req.body, {
    name: ["required", "string", "max:255"],
    email: ["required", "email"],
    content: ["required", "string"],
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
