import express from "express";
import CommentsController from "../controllers/comments";

const commentsRoutes = express.Router();

commentsRoutes.get("/:id", CommentsController.show);
commentsRoutes.patch("/:id", CommentsController.update);
commentsRoutes.delete("/:id", CommentsController.delete);

export { commentsRoutes };
