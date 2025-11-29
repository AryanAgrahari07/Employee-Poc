const employees = require("./employees").employees;
const employee = require("./employee").employee;

async function me(parent, args, ctx) {
  if (!ctx.user) return null;
  return {
    id: ctx.user.id,
    username: ctx.user.username,
    role: ctx.user.role
  };
}

module.exports = {
  employees,
  employee,
  me
};
