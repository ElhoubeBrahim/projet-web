import { Request, Response } from "express";

export default class CategoriesController {
  public static async index(req: Request, res: Response) {
    res.send("List Categories");
  }

  public static async create(req: Request, res: Response) {
    res.send("Create Category");
  }

  public static async show(req: Request, res: Response) {
    res.send("Get Category");
  }

  public static async update(req: Request, res: Response) {
    res.send("Update Category");
  }

  public static async delete(req: Request, res: Response) {
    res.send("Destroy Category");
  }
}
