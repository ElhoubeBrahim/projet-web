import { Request, Response } from "express";
import ArticlesService from "../services/articles";
import { CreateArticleRequest, UpdateArticleRequest } from "../types/articles";

export default class ArticlesController {
  public static async index(req: Request, res: Response) {
    // Get pagination params from query string
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page);

    // Get filters from query string
    const search = req.query.search as string;
    const categories = req.query.categories
      ? (req.query.categories as string).split(",").map(Number)
      : undefined;
    const authors = req.query.authors
      ? (req.query.authors as string).split(",").map(Number)
      : undefined;

    // Get articles from service
    const { articles, pagination } = await ArticlesService.getAll(
      {
        page,
        per_page,
      },
      {
        search,
        categories,
        authors,
      },
    );

    // Return articles and pagination as JSON response
    res.json({
      status: "success",
      data: articles,
      pagination,
    });
  }

  public static async create(req: Request, res: Response) {
    // Get article data from request body
    const articleData: CreateArticleRequest = req.body;

    // Create article
    const article = await ArticlesService.create(articleData, req.user);

    // Return article as JSON response
    res.json({
      status: "success",
      data: article,
    });
  }

  public static async show(req: Request, res: Response) {
    // Get article id
    const id = Number(req.params.id);

    // Get article from service
    const article = await ArticlesService.findById(id);
    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "Article not found",
      });
    }

    // Return article as JSON response
    res.json({
      status: "success",
      data: article,
    });
  }

  public static async update(req: Request, res: Response) {
    // Check if article exists
    const id = Number(req.params.id);
    const article = await ArticlesService.findById(id);
    if (!article || article.authorId !== req.user.id) {
      return res.status(404).json({
        status: "error",
        message: "Article not found",
      });
    }

    // Update article
    const articleData: UpdateArticleRequest = req.body;
    const updatedArticle = await ArticlesService.update(id, articleData);

    // Return updated article as JSON response
    res.json({
      status: "success",
      data: updatedArticle,
    });
  }

  public static async delete(req: Request, res: Response) {
    // Check if article exists
    const id = Number(req.params.id);
    const article = await ArticlesService.findById(id);
    if (!article || article.authorId !== req.user.id) {
      return res.status(404).json({
        status: "error",
        message: "Article not found",
      });
    }

    // Delete article
    const deletedArticle = await ArticlesService.delete(id);

    // Return success response
    res.json({
      status: "success",
      message: "Article deleted successfully",
      data: deletedArticle,
    });
  }
}
