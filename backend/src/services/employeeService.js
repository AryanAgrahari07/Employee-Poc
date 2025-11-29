const prisma = require("../db/prisma");

async function listEmployees({ first = 10, after = null, filter = {}, sort = { field: "createdAt", direction: "DESC" } }) {
  // used by resolvers directly (Query.employees already implemented in resolvers)
  return prisma.employee.findMany({});
}

module.exports = { listEmployees };
