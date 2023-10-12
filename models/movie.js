// models/Movie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Your database connection

const Movie = sequelize.define('Movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100], // Movie name should be between 2 and 100 characters
    },
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      min: 0,    // Minimum rating
      max: 10,   // Maximum rating
    },
  },
});

module.exports = Movie;
