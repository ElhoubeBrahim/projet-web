import { Request, Response } from "express";

export default class ArticlesController {
  public static async index(req: Request, res: Response) {
    res.send("List Articles");
  }

  public static async create(req: Request, res: Response) {
    res.send("Create Article");
  }

  public static async show(req: Request, res: Response) {
    res.send("Get Article");
  }

  public static async update(req: Request, res: Response) {
    res.send("Update Article");
  }

  public static async delete(req: Request, res: Response) {
    res.send("Destroy Article");
  }
}
