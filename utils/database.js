const Sequelize = require("sequelize");

// using postgres;
console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports = sequelize;