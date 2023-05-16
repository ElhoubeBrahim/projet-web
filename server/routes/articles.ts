import express from "express";
import ArticlesController from "../controllers/articles";

const articlesRoutes = express.Router();

articlesRoutes.get("/", ArticlesController.index);
articlesRoutes.post("/", ArticlesController.create);
articlesRoutes.get("/:id", ArticlesController.show);
articlesRoutes.patch("/:id", ArticlesController.update);
articlesRoutes.delete("/:id", ArticlesController.delete);

export { articlesRoutes };
