const prisma = require("../../db/prisma");

async function employee(parent, args) {
  const e = await prisma.employee.findUnique({ where: { id: args.id } });
  return e;
}

module.exports = { employee };
