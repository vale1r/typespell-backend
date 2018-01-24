#!/usr/bin/env nodejs
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 8000;

//app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT,OPTIONS");	
  next();
});


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  
  const spellspaceDB = database.db('spellspace');
  require('./app/routes')(app, spellspaceDB);
  app.listen(port, () => {
  	console.log('We are live on ' + port);
  });
})