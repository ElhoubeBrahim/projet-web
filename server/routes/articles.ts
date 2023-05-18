import express from "express";
import ArticlesController from "../controllers/articles";
import CommentsController from "../controllers/comments";
import authMiddleware from "../middlewares/auth";
import authorMiddleware from "../middlewares/author";
import {
  validateCreateArticle,
  validateCreateComment,
  validateUpdateArticle,
} from "../validation/articles";
import multer from "multer";
import articleExistsMiddleware from "../middlewares/articleExists";

const articlesRoutes = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "storage/articles");
    },
    filename: (req, file, cb) => {
      const uuid = Math.random().toString(36).substring(2, 15);
      cb(null, `${Date.now()}-${uuid}`);
    },
  }),
});

articlesRoutes.get("/", ArticlesController.index);
articlesRoutes.post(
  "/",
  authMiddleware,
  authorMiddleware,
  validateCreateArticle,
  ArticlesController.create,
);
articlesRoutes.get("/:id", articleExistsMiddleware, ArticlesController.show);
articlesRoutes.patch(
  "/:id",
  authMiddleware,
  authorMiddleware,
  articleExistsMiddleware,
  validateUpdateArticle,
  ArticlesController.update,
);
articlesRoutes.delete(
  "/:id",
  authMiddleware,
  authorMiddleware,
  articleExistsMiddleware,
  ArticlesController.delete,
);

articlesRoutes.get("/thumbnail/:name", ArticlesController.getThumbnail);
articlesRoutes.post(
  "/:id/thumbnail",
  authMiddleware,
  authorMiddleware,
  articleExistsMiddleware,
  upload.single("image"),
  ArticlesController.uploadThumbnail,
);

articlesRoutes.get(
  "/:id/comments",
  articleExistsMiddleware,
  CommentsController.index,
);
articlesRoutes.post(
  "/:id/comments",
  articleExistsMiddleware,
  validateCreateComment,
  CommentsController.create,
);

export { articlesRoutes };
