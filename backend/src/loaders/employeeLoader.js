const DataLoader = require("dataloader");
const prisma = require("../db/prisma");

function employeeLoader() {
  return new DataLoader(async (keys) => {
    const rows = await prisma.employee.findMany({
      where: { id: { in: keys } }
    });
    const map = new Map(rows.map((r) => [r.id, r]));
    return keys.map((k) => map.get(k));
  });
}

module.exports = employeeLoader;
