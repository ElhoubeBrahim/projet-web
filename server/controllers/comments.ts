import { Request, Response } from "express";

export default class CommentsController {
  public static async index(req: Request, res: Response) {
    res.send("List Comments");
  }

  public static async create(req: Request, res: Response) {
    res.send("Create Comment");
  }

  public static async show(req: Request, res: Response) {
    res.send("Get Comment");
  }

  public static async update(req: Request, res: Response) {
    res.send("Update Comment");
  }

  public static async delete(req: Request, res: Response) {
    res.send("Destroy Comment");
  }
}
