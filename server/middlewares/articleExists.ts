import { NextFunction, Request, Response } from "express";
import ArticlesService from "../services/articles";

export default async function articleExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articleId = Number(req.params.id);
    const article = await ArticlesService.findById(articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    next();
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Article not found",
    });
  }
}
