const { GraphQLError } = require("graphql");
const prisma = require("../../db/prisma");
const { requireRole } = require("../../auth/requireRole");

async function deleteEmployee(parent, args, ctx) {
  const { id } = args;
  
  // Check if employee exists
  const employee = await prisma.employee.findUnique({ where: { id } });
  if (!employee) {
    throw new GraphQLError("Employee not found", {
      extensions: { code: "NOT_FOUND" }
    });
  }

  // Delete the employee
  await prisma.employee.delete({ where: { id } });
  
  return true;
}

module.exports = {
  deleteEmployee: requireRole("ADMIN", deleteEmployee)
};

