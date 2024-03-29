import { Request, Response } from "express";
import ArticlesService from "../services/articles";
import { CreateArticleRequest, UpdateArticleRequest } from "../types/articles";
import fs from "fs";
import path from "path";

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
    // Get article
    const id = Number(req.params.id);
    const article = await ArticlesService.findById(id);

    // Return article as JSON response
    res.json({
      status: "success",
      data: article,
    });
  }

  public static async update(req: Request, res: Response) {    
    // Update article
    const id = Number(req.params.id);
    const articleData: UpdateArticleRequest = req.body;
    const updatedArticle = await ArticlesService.update(id, articleData);

    // Return updated article as JSON response
    res.json({
      status: "success",
      data: updatedArticle,
    });
  }

  public static async delete(req: Request, res: Response) {    
    // Delete article
    const id = Number(req.params.id);
    const deletedArticle = await ArticlesService.delete(id);

    // Return success response
    res.json({
      status: "success",
      message: "Article deleted successfully",
      data: deletedArticle,
    });
  }

  public static async getThumbnail(req: Request, res: Response) {
    // Get thumbnail name
    const name = req.params.name;

    // Get image file
    const file = fs.readFileSync(
      path.join(__dirname, `../storage/articles/${name}`),
    );

    // Return image file as response
    res.end(file);
  }

  public static async uploadThumbnail(req: Request, res: Response) {    
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }
    
    // Update article
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const id = Number(req.params.id);
    const updatedArticle = await ArticlesService.update(id, {
      image: `${baseURL}/api/articles/thumbnail/${req.file.filename}`,
    });

    // Return updated article as JSON response
    res.json({
      status: "success",
      data: updatedArticle,
    });
  }
}
