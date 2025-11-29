const prisma = require("../../db/prisma");
const { requireRole } = require("../../auth/requireRole");

async function addEmployee(parent, args, ctx) {
  const input = args.input;
  const created = await prisma.employee.create({ data: input });
  return created;
}

module.exports = {
  addEmployee: requireRole("ADMIN", addEmployee)
};
