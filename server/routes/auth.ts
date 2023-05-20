import express from "express";
import AuthController from "../controllers/auth";
import { validateRegister } from "../validation/auth";

const authRoutes = express.Router();

authRoutes.get("/users", AuthController.getUsers);
authRoutes.get("/users/:id", AuthController.getUser);
authRoutes.post("/register", validateRegister, AuthController.register);
authRoutes.post("/login", AuthController.login);

export { authRoutes };
