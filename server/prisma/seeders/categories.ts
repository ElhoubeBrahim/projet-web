import { PrismaClient } from "@prisma/client";
import Seeder from "./seeder";

export default class CategoriesSeeder implements Seeder {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async init(): Promise<void> {
    // Delete all categories
    await this._prisma.category.deleteMany();
    // Init id sequence
    await this._prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1;`;
  }

  async run(): Promise<void> {
    await this._prisma.category.createMany({
      data: [
        {
          name: "Programming",
        },
        {
          name: "Data Science",
        },
        {
          name: "Beauty",
        },
        {
          name: "Productivity",
        },
        {
          name: "Machine Learning",
        },
        {
          name: "Politics",
        },
        {
          name: "Leadership",
        },
        {
          name: "Marketing",
        },
        {
          name: "UX Design",
        },
        {
          name: "Business",
        },
      ],
    });
  }

  async close(): Promise<void> {
    await this._prisma.$disconnect();
  }
}
