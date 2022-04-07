const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");
const user = sequelize.define("user", {
  user_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 2,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;