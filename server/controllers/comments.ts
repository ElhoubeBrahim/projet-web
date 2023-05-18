import { Request, Response } from "express";
import ArticlesService from "../services/articles";
import CommentsService from "../services/comments";

export default class CommentsController {
  public static async index(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const comments = await CommentsService.getAll(articleId);
    res.json({
      status: "success",
      data: comments,
    });
  }

  public static async create(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const comment = await CommentsService.create(req.body, articleId);
    res.json({
      status: "success",
      message: "Comment created successfully",
      data: comment,
    });
  }

  public static async show(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const comment = await CommentsService.getById(commentId);
    if (!comment) {
      res.status(404).json({
        status: "error",
        message: "Comment not found",
      });
      return;
    }

    res.json({
      status: "success",
      data: comment,
    });
  }
}
