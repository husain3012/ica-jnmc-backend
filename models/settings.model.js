const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");
const settings = sequelize.define("setting", {
  createdBy: {
    type: Sequelize.STRING,
    required: true,
  },
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
  serverCrons: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = settings;
