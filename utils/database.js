import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// using postgres;
console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL);
export default sequelize;
