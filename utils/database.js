const Sequelize = require("sequelize");

// using postgres;
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports = sequelize;