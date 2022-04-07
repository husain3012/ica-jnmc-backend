import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

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

export default user;
