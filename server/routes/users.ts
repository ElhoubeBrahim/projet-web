import express from "express";
import multer from "multer";
import UsersController from "../controllers/users";
import authMiddleware from "../middlewares/auth";
import { validateUpdateData } from "../validation/users";

const usersRoutes = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "storage/avatars");
    },
    filename: (req, file, cb) => {
      const uuid = Math.random().toString(36).substring(2, 15);
      cb(null, `${Date.now()}-${uuid}`);
    },
  }),
});

usersRoutes.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  UsersController.changeAvatar,
);
usersRoutes.get("/avatar/:name", UsersController.getAvatar);
usersRoutes.post(
  "/update/password",
  authMiddleware,
  UsersController.updatePassword,
);
usersRoutes.post(
  "/update/data",
  authMiddleware,
  validateUpdateData,
  UsersController.updateData,
);

export { usersRoutes };
