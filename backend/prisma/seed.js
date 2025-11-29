// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // wipe
  await prisma.employee.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  const adminPass = await bcrypt.hash("admin123", 10);
  const empPass = await bcrypt.hash("employee123", 10);

  await prisma.user.create({
    data: { username: "admin", passwordHash: adminPass, role: "ADMIN" }
  });
  await prisma.user.create({
    data: { username: "employee", passwordHash: empPass, role: "EMPLOYEE" }
  });

  const subjectsPool = [
    ["Math", "Science", "English"],
    ["History", "Geography"],
    ["Physics", "Chemistry"],
    ["Biology", "PE"],
    ["Computer", "Math"]
  ];

  const rows = [];
  for (let i = 1; i <= 60; i++) {
    rows.push({
      name: `Employee ${i}`,
      age: 20 + (i % 15),
      class: `Class ${((i % 5) + 1)}`,
      subjects: subjectsPool[i % subjectsPool.length],
      attendance: Math.round(70 + (i % 30)),
    });
  }

  for (const r of rows) {
    await prisma.employee.create({ data: r });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
