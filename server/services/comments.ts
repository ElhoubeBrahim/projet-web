import { Comment, PrismaClient } from "@prisma/client";
import { CreateCommentRequest } from "../types/articles";

const prisma = new PrismaClient();

export default class CommentsService {
  public static async getAll(articleId: number): Promise<Comment[]> {
    return await prisma.comment.findMany({
      where: {
        articleId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public static async getById(id: number): Promise<Comment | null> {
    return await prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  public static async create(
    data: CreateCommentRequest,
    articleId: number,
  ): Promise<Comment> {
    return await prisma.comment.create({
      data: {
        name: data.name,
        email: data.email,
        content: data.content,
        article: {
          connect: {
            id: articleId,
          },
        },
      },
    });
  }
}
