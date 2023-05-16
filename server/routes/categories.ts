import express from "express";
import CategoriesController from "../controllers/categories";

const categoriesRoutes = express.Router();

categoriesRoutes.get("/", CategoriesController.index);
categoriesRoutes.post("/", CategoriesController.create);
categoriesRoutes.get("/:id", CategoriesController.show);
categoriesRoutes.patch("/:id", CategoriesController.update);
categoriesRoutes.delete("/:id", CategoriesController.delete);

export { categoriesRoutes };
