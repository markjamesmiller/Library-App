//dependencies
const router = require('./routes');
const express = require('express');
const config = require('./config');
const path = require('path');
const jsonParser = require('body-parser').json;


const app = express();

app.use(jsonParser());

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/api', router);

app.listen(process.env.PORT, function() {
  console.log('Personal Library App server is listening on PORT' + process.env.PORT);
});

//connecting to mongodb
var mongoose = require("mongoose");
const connectionString = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`;
mongoose.connection.openUri(connectionString);
var db = mongoose.connection;
db.on('error', function(err){
    console.error('connection error:', err);
});

