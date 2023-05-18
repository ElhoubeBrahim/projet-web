import express from "express";
import ArticlesController from "../controllers/articles";
import CommentsController from "../controllers/comments";
import authMiddleware from "../middlewares/auth";
import authorMiddleware from "../middlewares/author";
import {
  validateCreateArticle,
  validateUpdateArticle,
} from "../validation/articles";

const articlesRoutes = express.Router();

articlesRoutes.get("/", ArticlesController.index);
articlesRoutes.post(
  "/",
  authMiddleware,
  authorMiddleware,
  validateCreateArticle,
  ArticlesController.create,
);
articlesRoutes.get("/:id", ArticlesController.show);
articlesRoutes.patch(
  "/:id",
  authMiddleware,
  authorMiddleware,
  validateUpdateArticle,
  ArticlesController.update,
);
articlesRoutes.delete(
  "/:id",
  authMiddleware,
  authorMiddleware,
  ArticlesController.delete,
);

articlesRoutes.get("/:id/comments", CommentsController.index);
articlesRoutes.post("/:id/comments", CommentsController.create);

export { articlesRoutes };
