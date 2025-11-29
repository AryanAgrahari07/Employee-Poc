const { AuthenticationError, ForbiddenError } = require("apollo-server-express");

function requireRole(role, resolverFn) {
  return (parent, args, ctx, info) => {
    const user = ctx.user;
    if (!user) throw new AuthenticationError("Authentication required");
    if (user.role !== role) throw new ForbiddenError("Insufficient permissions");
    return resolverFn(parent, args, ctx, info);
  };
}

module.exports = { requireRole };
