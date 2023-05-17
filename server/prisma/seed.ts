import * as articlesSeeder from "./seeders/articles";
import * as categoriesSeeder from "./seeders/categories";
import * as commentsSeeder from "./seeders/comments";
import * as usersSeeder from "./seeders/users";

const seeders = {
  usersSeeder,
  categoriesSeeder,
  articlesSeeder,
  commentsSeeder,
  // Add more seeders here
};

async function main() {
  for (const [name, seeder] of Object.entries(seeders)) {
    console.log();
    console.log(`\t🌱 Seeding ${name}...`);

    await seeder.init();
    await seeder.run();
    await seeder.close();

    console.log(`\t🎉 Seeded ${name}!`);
  }
}

main();
