const { GraphQLError } = require("graphql");
const prisma = require("../../db/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../auth/generateToken");

async function login(parent, args) {
  const { username, password } = args;
  
  if (!username || !password) {
    throw new GraphQLError("Username and password are required", {
      extensions: { code: "BAD_USER_INPUT" }
    });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new GraphQLError("Invalid credentials", {
      extensions: { code: "UNAUTHENTICATED" }
    });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new GraphQLError("Invalid credentials", {
      extensions: { code: "UNAUTHENTICATED" }
    });
  }

  if (!process.env.JWT_SECRET) {
    throw new GraphQLError("Server configuration error", {
      extensions: { code: "INTERNAL_SERVER_ERROR" }
    });
  }

  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  return { 
    token, 
    user: { 
      id: user.id, 
      username: user.username, 
      role: user.role 
    } 
  };
}

module.exports = { login };
