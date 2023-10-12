require('dotenv').config(); 
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSER, process.env.DATABASEPASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
