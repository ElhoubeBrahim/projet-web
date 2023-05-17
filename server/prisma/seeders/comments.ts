import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import Seeder from "./seeder";

export default class commentsSeeder implements Seeder {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async init(): Promise<void> {
    // Delete all comments
    await this._prisma.comment.deleteMany();
    // Init id sequence
    await this._prisma.$executeRaw`ALTER TABLE Comment AUTO_INCREMENT = 1;`;
  }

  async run(): Promise<void> {
    for (let i = 0; i < 100; i++) {
      await this._prisma.comment.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          content: faker.lorem.paragraph(),
          articleId: faker.number.int({ min: 1, max: 30 }),
        },
      });
    }
  }

  async close(): Promise<void> {
    await this._prisma.$disconnect();
  }
}
