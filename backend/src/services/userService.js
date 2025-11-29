const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");

async function createUser({ username, password, role = "EMPLOYEE" }) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { username, passwordHash, role } });
}

module.exports = { createUser };
