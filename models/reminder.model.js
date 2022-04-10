const Sequelize = require("sequelize");
const sequelize = require("../utils/database.js");
const reminder = sequelize.define("reminder", {
  email: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  sendAt: {
    type: Sequelize.DATE,
  },
  subject: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
});
module.exports = reminder;
