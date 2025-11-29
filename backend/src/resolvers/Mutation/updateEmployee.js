const prisma = require("../../db/prisma");
const { requireRole } = require("../../auth/requireRole");

async function updateEmployee(parent, args, ctx) {
  const { id, input } = args;
  const updated = await prisma.employee.update({
    where: { id },
    data: input
  });
  return updated;
}

module.exports = {
  updateEmployee: requireRole("ADMIN", updateEmployee)
};
