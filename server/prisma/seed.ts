import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create initial daily stats entry
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyStats.upsert({
    where: { date: today },
    update: {},
    create: {
      date: today,
      uniqueVisitors: 0,
      totalPageViews: 0,
      mcpChats: 0,
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
