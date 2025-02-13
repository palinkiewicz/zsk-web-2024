import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Check if sample data already exists to avoid duplicates
    const existingUser = await prisma.user.findFirst();
    if (!existingUser) {
        await prisma.category.createMany({
            data: [
                {
                    title: 'Programming',
                    description:
                        'The art of writing code to create software, automate tasks, and solve complex problems using various programming languages.',
                },
                {
                    title: 'Lego',
                    description:
                        'A creative building system using interlocking plastic bricks, allowing people of all ages to construct models, vehicles, and imaginative worlds.',
                },
                {
                    title: 'Stocks',
                    description:
                        'Investing in shares of companies, participating in the financial markets, and analyzing trends to grow wealth over time.',
                },
                {
                    title: 'Anime',
                    description:
                        'A popular style of animated storytelling from Japan, featuring diverse genres, unique art styles, and captivating narratives.',
                },
            ],
        });

        const categoryMap = await prisma.category.findMany({
            where: { title: { in: categoryNames } },
            select: { id: true, title: true },
        }).reduce((acc, cat) => {
            acc[cat.title] = cat.id;
            return acc;
        }, {});

        await prisma.post.createMany({
            data: [
                {
                    title: 'Mastering Node.js: Best Practices',
                    content:
                        'Learn the best practices for building scalable and efficient applications using Node.js.',
                    published: true,
                    categoryId: categoryMap['Programming'],
                },
                {
                    title: 'Understanding TypeScript Generics',
                    content:
                        'Generics in TypeScript provide flexibility while maintaining strong type safety. Here’s how to use them effectively.',
                    published: false,
                    categoryId: categoryMap['Programming'],
                },
                {
                    title: 'How to Build a Lego Star Wars Spaceship',
                    content:
                        'Step-by-step guide to constructing an epic Star Wars spaceship using Lego bricks!',
                    published: true,
                    categoryId: categoryMap['Lego'],
                },
                {
                    title: 'The Most Expensive Lego Sets Ever Released',
                    content:
                        'Discover the rarest and most valuable Lego sets ever produced, from collectors’ editions to limited releases.',
                    published: true,
                    categoryId: categoryMap['Lego'],
                },
                {
                    title: 'How to Read Stock Charts Like a Pro',
                    content:
                        'Stock charts tell a story. Learn how to analyze trends, patterns, and indicators for better investing decisions.',
                    published: true,
                    categoryId: categoryMap['Stocks'],
                },
                {
                    title: 'Dividend Stocks vs. Growth Stocks: Which is Better?',
                    content:
                        'Explore the key differences between dividend and growth stocks to choose the best strategy for your portfolio.',
                    published: false,
                    categoryId: categoryMap['Stocks'],
                },
                {
                    title: 'The Best Anime for Beginners',
                    content:
                        'New to anime? Start with these must-watch series that are perfect for beginners!',
                    published: true,
                    categoryId: categoryMap['Anime'],
                },
                {
                    title: 'Why Studio Ghibli Films Are Timeless',
                    content:
                        'Studio Ghibli has created some of the most beloved animated films in history. Here’s why they continue to captivate audiences.',
                    published: true,
                    categoryId: categoryMap['Anime'],
                },
            ],
        });

        console.log('Seed data inserted successfully.');
    } else {
        console.log('Seed data already exists. Skipping.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
