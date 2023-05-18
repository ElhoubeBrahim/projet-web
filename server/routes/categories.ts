import express from "express";
import CategoriesController from "../controllers/categories";
import adminMiddleware from "../middlewares/admin";
import authMiddleware from "../middlewares/auth";
import { validateCreateCategory } from "../validation/categories";

const categoriesRoutes = express.Router();

categoriesRoutes.get("/", CategoriesController.index);
categoriesRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateCreateCategory,
  CategoriesController.create,
);
categoriesRoutes.get("/:id", CategoriesController.show);
categoriesRoutes.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoriesController.update,
);
categoriesRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoriesController.delete,
);

export { categoriesRoutes };
