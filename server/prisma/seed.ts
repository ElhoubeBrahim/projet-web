import articlesSeeder from "./seeders/articles";
import categoriesSeeder from "./seeders/categories";
import commentsSeeder from "./seeders/comments";
import usersSeeder from "./seeders/users";

const seeders = {
  usersSeeder,
  categoriesSeeder,
  articlesSeeder,
  commentsSeeder,
  // Add more seeders here
};

async function main() {
  for (const [name, Seeder] of Object.entries(seeders)) {
    console.log();
    console.log(`\t🌱 Seeding ${name}...`);

    const seeder = new Seeder();
    await seeder.init();
    await seeder.run();
    await seeder.close();

    console.log(`\t🎉 Seeded ${name}!`);
  }
}

main();
