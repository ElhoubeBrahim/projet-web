import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import UserService from "../services/user";
import { LoginRequest, UserRequest } from "../types/user";
import jwt from "jsonwebtoken";

export default class AuthController {
  public static async getUsers(req: Request, res: Response) {
    // Get pagination params from query string
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page);

    // Get filters from query string
    const role = req.query.search
      ? req.query.search == "admin"
        ? "ADMIN"
        : "AUTHOR"
      : undefined;

    const { users, pagination } = await UserService.getAll(
      {
        page,
        per_page,
      },
      {
        role,
        featured: req.query.featured != undefined,
      },
    );

    res.status(200).json({
      status: "success",
      data: users,
      pagination,
    });
  }

  public static async getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.findById(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }

  public static async register(req: Request, res: Response) {
    // Get user data
    const userData: UserRequest = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profession: req.body.profession,
    };

    // Check if the user already exists
    const user: User | null = await UserService.findByEmail(userData.email);
    if (user) {
      res.status(409).json({
        status: "error",
        message: "User already exists",
      });
      return;
    }

    // Create the user
    userData.password = bcrypt.hashSync(userData.password, 10);
    const newUser: User = await UserService.create(userData);

    // Return the user
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  }

  public static async login(req: Request, res: Response) {
    // Get user data
    const userData: LoginRequest = {
      email: req.body.email,
      password: req.body.password,
    };

    // Check if the user exists
    const user: User | null = await UserService.findByEmail(userData.email);
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    // Check if the password is correct
    const passwordMatch = bcrypt.compareSync(userData.password, user.password || "");
    if (!passwordMatch) {
      res.status(401).json({
        status: "error",
        message: "Incorrect password",
      });
      return;
    }

    // Generate the token
    const token: string = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Return the user
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  }
}
