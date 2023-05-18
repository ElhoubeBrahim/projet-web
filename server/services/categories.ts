import { Category, PrismaClient } from "@prisma/client";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types/categories";

const prisma = new PrismaClient();

export default class CategoriesService {
  public static async getAll(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  public static async create(data: CreateCategoryRequest): Promise<Category> {
    return await prisma.category.create({ data });
  }

  public static async getById(id: number): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { id } });
  }

  public static async update(
    id: number,
    data: UpdateCategoryRequest,
  ): Promise<Category | null> {
    return await prisma.category.update({ where: { id }, data });
  }

  public static async delete(id: number): Promise<Category | null> {
    return await prisma.category.delete({ where: { id } });
  }
}
