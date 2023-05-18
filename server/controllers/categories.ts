import { Request, Response } from "express";
import CategoriesService from "../services/categories";

export default class CategoriesController {
  public static async index(req: Request, res: Response) {
    const categories = await CategoriesService.getAll();
    res.json({
      status: "success",
      data: categories,
    });
  }

  public static async create(req: Request, res: Response) {
    const category = await CategoriesService.create(req.body);
    res.json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  }

  public static async show(req: Request, res: Response) {
    const category = await CategoriesService.getById(Number(req.params.id));
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
      return;
    }

    res.json({
      status: "success",
      data: category,
    });
  }

  public static async update(req: Request, res: Response) {
    const category = await CategoriesService.getById(Number(req.params.id));
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
      return;
    }

    const updatedCategory = await CategoriesService.update(
      Number(req.params.id),
      req.body,
    );

    res.json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  }

  public static async delete(req: Request, res: Response) {
    const category = await CategoriesService.getById(Number(req.params.id));
    if (!category) {
      res.status(404).json({
        status: "error",
        message: "Category not found",
      });
      return;
    }

    const deletedCategory = await CategoriesService.delete(Number(req.params.id));
    
    res.json({
      status: "success",
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  }
}
