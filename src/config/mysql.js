const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    dialect: "mysql"
  }
);

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Conected Successful")
  } catch (e) {
    console.log(`Error MySQL:`, e);
  }
};

module.exports = {
  dbConnectMySql,
  sequelize,
};