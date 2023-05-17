import { Article } from "@prisma/client";
import { PrismaClient, Prisma } from "@prisma/client";
import { Pagination } from "../types/pagination";

const prisma = new PrismaClient();

export default class ArticlesService {
  public static async getAll(
    pagination?: {
      page: number;
      per_page: number;
    },
    filters?: {
      search?: string;
      categories?: number[];
      authors?: number[];
    },
  ): Promise<{ articles: Article[]; pagination: Pagination | null }> {
    // Define options object
    const options: Prisma.ArticleFindManyArgs = {};

    // Filter by categgories
    if (filters && filters.categories) {
      options.where = {
        categories: {
          some: {
            id: {
              in: filters.categories,
            },
          },
        },
      };
    }

    // Filter by authors
    if (filters && filters.authors) {
      options.where = {
        author: {
          id: {
            in: filters.authors,
          },
        },
      };
    }

    // Filter by search
    if (filters && filters.search) {
      options.where = {
        OR: [
          { title: { contains: filters.search } },
          { content: { contains: filters.search } },
        ],
      };
    }

    // Add pagination options to options object if pagination object is passed
    let paginationResponse: Pagination | null = null;
    if (pagination && pagination.page && pagination.per_page) {
      paginationResponse = {
        page: pagination.page,
        per_page: pagination.per_page,
        total: await prisma.article.count({
          where: options.where,
        }),
      };

      options.skip = pagination.per_page * (pagination.page - 1);
      options.take = pagination.per_page;
    }

    // Get articles and return them along with pagination object
    const articles = await prisma.article.findMany(options);
    return {
      articles,
      pagination: paginationResponse,
    };
  }
}
