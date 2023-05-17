import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../types/user";

const prisma = new PrismaClient();

export default class UserService {
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
