import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function init() {
  // Delete all users
  await prisma.user.deleteMany();
  // Init id sequence
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
}

async function run() {
  // Create admin user
  await prisma.user.create({
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
    await prisma.user.upsert({
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

async function close() {
  await prisma.$disconnect();
}

export {
  init,
  run,
  close,
};
