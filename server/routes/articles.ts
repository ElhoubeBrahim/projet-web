import express from "express";
import ArticlesController from "../controllers/articles";
import CommentsController from "../controllers/comments";

const articlesRoutes = express.Router();

articlesRoutes.get("/", ArticlesController.index);
articlesRoutes.post("/", ArticlesController.create);
articlesRoutes.get("/:id", ArticlesController.show);
articlesRoutes.patch("/:id", ArticlesController.update);
articlesRoutes.delete("/:id", ArticlesController.delete);

articlesRoutes.get("/:id/comments", CommentsController.index);
articlesRoutes.post("/:id/comments", CommentsController.create);

export { articlesRoutes };
