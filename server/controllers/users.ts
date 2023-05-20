import { Request, Response } from "express";
import UserService from "../services/user";
import fs from "fs";
import path from "path";

export default class UsersController {
  public static async changeAvatar(req: Request, res: Response) {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }

    // Update user
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const updatedUser = await UserService.update(req.user.id, {
      avatar: `${baseURL}/api/users/avatar/${req.file.filename}`,
    });

    // Return updated user as JSON response
    res.json({
      status: "success",
      data: updatedUser,
    });
  }

  public static async getAvatar(req: Request, res: Response) {
    // Get thumbnail name
    const name = req.params.name;

    // Get image file
    const file = fs.readFileSync(
      path.join(__dirname, `../storage/avatars/${name}`),
    );

    // Return image file as response
    res.end(file);
  }
}
