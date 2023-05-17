import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function init() {
  // Delete all comments
  await prisma.comment.deleteMany();
  // Init id sequence
  await prisma.$executeRaw`ALTER TABLE Comment AUTO_INCREMENT = 1;`;
}

async function run() {
  for (let i = 0; i < 100; i++) {
    await prisma.comment.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        content: faker.lorem.paragraph(),
        articleId: faker.number.int({ min: 1, max: 30 }),
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
