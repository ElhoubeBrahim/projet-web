import { Prisma, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Pagination } from "../types/pagination";
import { UserRequest } from "../types/user";

const prisma = new PrismaClient();

export default class UserService {
  public static async getAll(
    pagination?: {
      page: number;
      per_page: number;
    },
    filters?: {
      role?: "ADMIN" | "AUTHOR";
    },
  ): Promise<{ users: User[]; pagination: Pagination | null }> {
    const options: Prisma.UserFindManyArgs = {
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    };

    // Filter by role
    if (filters && filters.role) {
      options.where = {
        role: filters.role,
      };
    }

    // Add pagination options to options object if pagination object is passed
    let paginationResponse: Pagination | null = null;
    if (pagination && pagination.page && pagination.per_page) {
      paginationResponse = {
        page: pagination.page,
        per_page: pagination.per_page,
        total: await prisma.user.count({
          where: options.where,
        }),
      };

      options.skip = pagination.per_page * (pagination.page - 1);
      options.take = pagination.per_page;
    }

    return {
      users: await prisma.user.findMany(options),
      pagination: paginationResponse,
    };
  }

  protected static async findBy(key: string, value: any): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        [key]: value,
      },
    });
  }

  public static async findById(id: number): Promise<User | null> {
    return this.findBy("id", id);
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return this.findBy("email", email);
  }

  public static async create(userData: UserRequest): Promise<User> {
    return prisma.user.create({
      data: userData,
    });
  }
}
