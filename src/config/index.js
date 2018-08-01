require('dotenv').config();

module.exports = {
  appName: 'Library App',
  port: process.env.PORT,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    dbName:   process.env.DB_NAME,
  }
};

//for my IDE I have to use process.env.PORT but you will need to put in your own local port