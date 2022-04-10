const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");
const settings = sequelize.define("setting", {
  emailReminders: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  whatsappReminders: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  cronInterval: {
    type: Sequelize.STRING,
    defaultValue: "daily",
  },
});
module.exports = settings;
