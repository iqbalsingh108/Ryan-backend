const express = require('express');
const cors = require('cors');
require("dotenv").config();

// const mysql = require("./dbConfig")


const router = require("./routes/movie")

const app = express();
app.use(cors())
const sequelize = require('./sequelize');
const Movie = require('./models/movie')
app.use(express.json())
app.use(router);



(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
    await sequelize.sync(); // Sync the model with the database
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
})();


app.listen(process.env.PORT , (error)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log(`server listening on ${process.env.PORT}`);
  }
})





