var express = require('express');
var redis = require('redis');

GLOBAL.rds = redis.createClient();

var app = express();
app.use(express.bodyParser());

var routes = require('./routes')(app);

app.listen(8087);
