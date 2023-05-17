import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function init() {
  // Delete all articles
  await prisma.article.deleteMany();
  // Init id sequence
  await prisma.$executeRaw`ALTER TABLE Article AUTO_INCREMENT = 1;`;
}

async function run() {
  // Get all categories
  const categories = await prisma.category.findMany();

  for (let i = 0; i < 30; i++) {
    // Generate article content
    let content = "";
    for (let j = 0; j < faker.number.int({ min: 3, max: 6 }); j++) {
      content += `<h2>${faker.lorem.sentence()}</h2>`;

      // Generate section paragraphs
      for (let k = 0; k < faker.number.int({ min: 1, max: 3 }); k++) {
        content += `<p>${faker.lorem.paragraph()}</p>`;
      }
    }

    // Create article
    const article = await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        content,
        image: faker.image.url(),
        published: faker.datatype.boolean(0.8),
        authorId: faker.number.int({ min: 2, max: 11 }),
      },
    });

    // Assign categories to article
    const randomCategories = faker.helpers.arrayElements(
      categories,
      faker.number.int({ min: 1, max: 3 }),
    );

    await prisma.article.update({
      where: { id: article.id },
      data: {
        categories: {
          connect: randomCategories.map((category) => ({ id: category.id })),
        },
      },
    });
  }
}

async function close() {
  await prisma.$disconnect();
}

export { init, run, close };
