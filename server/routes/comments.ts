import express from "express";
import CommentsController from "../controllers/comments";

const commentsRoutes = express.Router();

commentsRoutes.get("/:id", CommentsController.show);

export { commentsRoutes };
