const addEmployee = require("./addEmployee").addEmployee;
const updateEmployee = require("./updateEmployee").updateEmployee;
const deleteEmployee = require("./deleteEmployee").deleteEmployee;
const auth = require("./auth");

module.exports = {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  ...auth
};
