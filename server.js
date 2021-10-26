const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();


// Database Connection
(async function () {
  try {
    mongoose.connect(process.env.dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }, () => {
      console.log(chalk.yellow('The Database is ready to establish connection!!'));
    });
  } catch (error) {
    console.log(chalk.red('The Database did not Connect!!!'));
  }

  console.log('Connecting...');

  mongoose.connection.once('open', () => {
    console.log(chalk.green('Connection Succesfully Established Connection'));
  });
}());


const app = express();
const userRoute = require('./Routes/userRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user/', userRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});