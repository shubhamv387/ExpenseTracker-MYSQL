const Sequelize = require("sequelize");

const sequelize = new Sequelize("expensetracking", "root", "Shubham@@387", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
