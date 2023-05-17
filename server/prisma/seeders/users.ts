import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import Seeder from "./seeder";

export default class usersSeeder implements Seeder {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async init(): Promise<void> {
    // Delete all users
    await this._prisma.user.deleteMany();
    // Init id sequence
    await this._prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
  }

  async run(): Promise<void> {
    // Create admin user
    await this._prisma.user.create({
      data: {
        username: "admin",
        avatar: faker.image.avatar(),
        email: "admin@quillquest.com",
        password: bcrypt.hashSync("admin", 10),
        role: "ADMIN",
      },
    });

    // Create other users (authors)
    for (let i = 0; i < 10; i++) {
      const email = faker.internet.email();
      await this._prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
          email,
          password: bcrypt.hashSync("password", 10),
          profession: faker.person.jobTitle(),
        },
      });
    }
  }

  async close(): Promise<void> {
    await this._prisma.$disconnect();
  }
}
