import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import Seeder from "./seeder";

export default class articlesSeeder implements Seeder {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async init(): Promise<void> {
    // Delete all articles
    await this._prisma.article.deleteMany();
    // Init id sequence
    await this._prisma.$executeRaw`ALTER TABLE Article AUTO_INCREMENT = 1;`;
  }

  async run(): Promise<void> {
    const articles = [
      { title: "Introduction to Python Programming", category_id: 1 },
      { title: "Exploring Data with Pandas", category_id: 2 },
      { title: "10 Tips for Flawless Makeup", category_id: 3 },
      {
        title: "Boosting Productivity with Time Management Techniques",
        category_id: 4,
      },
      { title: "Machine Learning Basics: A Beginner's Guide", category_id: 5 },
      { title: "Understanding Political Systems", category_id: 6 },
      { title: "Effective Leadership Strategies for Success", category_id: 7 },
      { title: "Mastering the Art of Digital Marketing", category_id: 8 },
      { title: "Creating Engaging User Experiences", category_id: 9 },
      {
        title: "Starting Your Own Business: Key Considerations",
        category_id: 10,
      },
      { title: "Advanced Java Programming Techniques", category_id: 1 },
      { title: "Data Visualization with Matplotlib", category_id: 2 },
      {
        title: "Skincare Routine for Healthy and Glowing Skin",
        category_id: 3,
      },
      {
        title: "Time-Blocking: A Method for Enhanced Productivity",
        category_id: 4,
      },
      {
        title: "Deep Learning Applications in Computer Vision",
        category_id: 5,
      },
      { title: "Understanding Global Politics", category_id: 6 },
      {
        title: "Leadership Development: Building Strong Teams",
        category_id: 7,
      },
      {
        title: "Social Media Marketing Strategies for Business Growth",
        category_id: 8,
      },
      { title: "User-Centered Design Principles", category_id: 9 },
      { title: "Financial Planning for Small Businesses", category_id: 10 },
      { title: "Web Development with JavaScript", category_id: 1 },
      { title: "Data Cleaning Techniques for Data Science", category_id: 2 },
      { title: "Makeup Trends for the Summer Season", category_id: 3 },
      { title: "Effective Time Management Strategies", category_id: 4 },
      {
        title: "Reinforcement Learning in Artificial Intelligence",
        category_id: 5,
      },
      { title: "Understanding International Relations", category_id: 6 },
      {
        title: "Leadership Skills for Effective Communication",
        category_id: 7,
      },
      {
        title: "Content Marketing Strategies for Online Success",
        category_id: 8,
      },
      { title: "UX Design Principles for Mobile Applications", category_id: 9 },
      {
        title: "Business Plan Essentials: From Idea to Execution",
        category_id: 10,
      },
      { title: "C++ Programming: Intermediate Concepts", category_id: 1 },
      { title: "Exploratory Data Analysis with Python", category_id: 2 },
      { title: "Natural Skincare Products for a Healthy Glow", category_id: 3 },
      {
        title: "Effective Goal Setting for Increased Productivity",
        category_id: 4,
      },
      {
        title: "Natural Language Processing in Machine Learning",
        category_id: 5,
      },
      { title: "Political Ideologies and Their Impact", category_id: 6 },
      {
        title: "Strategic Leadership for Organizational Growth",
        category_id: 7,
      },
      { title: "Email Marketing Best Practices", category_id: 8 },
      { title: "Principles of User Interface Design", category_id: 9 },
      { title: "Financial Management for Small Businesses", category_id: 10 },
      {
        title: "Web Development Frameworks: Choosing the Right One",
        category_id: 1,
      },
      { title: "Feature Engineering in Data Science", category_id: 2 },
      { title: "Makeup Techniques for a Natural Look", category_id: 3 },
      { title: "Effective Project Management Strategies", category_id: 4 },
      {
        title: "Generative Adversarial Networks (GANs) in Machine Learning",
        category_id: 5,
      },
      { title: "International Political Economy", category_id: 6 },
      { title: "Inclusive Leadership for Diverse Teams", category_id: 7 },
      { title: "Social Media Advertising for Business Growth", category_id: 8 },
      { title: "Responsive Web Design Principles", category_id: 9 },
      {
        title: "Financial Analysis and Reporting for Business Success",
        category_id: 10,
      },
    ];

    for (let i = 0; i < articles.length; i++) {
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
      const article = await this._prisma.article.create({
        data: {
          title: articles[i].title,
          content,
          image: faker.image.url(),
          published: faker.datatype.boolean(0.8),
          authorId: faker.number.int({ min: 2, max: 11 }),
        },
      });

      // Assign categories to article
      await this._prisma.article.update({
        where: { id: article.id },
        data: {
          categories: {
            connect: [
              {
                id: articles[i].category_id,
              },
            ],
          },
        },
      });
    }
  }

  async close(): Promise<void> {
    await this._prisma.$disconnect();
  }
}
