import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function init() {
  // Delete all categories
  await prisma.category.deleteMany();
  // Init id sequence
  await prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1;`;
}

async function run() {
  await prisma.category.createMany({
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

async function close() {
  await prisma.$disconnect();
}

export {
  init,
  run,
  close,
};
