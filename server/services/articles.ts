import { Article, User } from "@prisma/client";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateArticleRequest, UpdateArticleRequest } from "../types/articles";
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
    const options: Prisma.ArticleFindManyArgs = {
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        categories: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    };

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

  public static async findById(id: number): Promise<Article | null> {
    return await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        categories: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  public static async create(
    article: CreateArticleRequest,
    author: User,
  ): Promise<Article> {
    return await prisma.article.create({
      data: {
        title: article.title,
        image: "/default/article.png",
        content: article.content,
        published: article.published,
        author: {
          connect: {
            id: author.id,
          },
        },
        categories: {
          connect: article.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  public static async update(
    id: number,
    article: UpdateArticleRequest,
  ): Promise<Article | null> {
    return await prisma.article.update({
      where: {
        id,
      },
      data: {
        title: article.title || undefined,
        content: article.content || undefined,
        image: article.image || undefined,
        published: article.published || undefined,
        categories: {
          set: article.categoryIds?.map((id) => ({ id })),
        },
      },
    });
  }

  public static async delete(id: number): Promise<Article | null> {
    return await prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
