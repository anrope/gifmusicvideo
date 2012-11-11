var express = require('express');
var redis = require('redis');

var app = express();
app.use(express.bodyParser());

var routes = require('./routes')(app);

if (app.settings.env == "production") {
    console.log('Starting production server\n')
    GLOBAL.rds = redis.createClient(6379,
        'nodejitsudb6110685230.redis.irstack.com');
    GLOBAL.rds.auth('nodejitsudb6110685230.redis.irstack.com:f327cfe980c971946e80b8e975fbebb4', function (err) {
        if (err) { throw err; }
        // You are now connected to your redis.
        app.listen(8087);
    });
} else {
    console.log('Starting development server\n');
    GLOBAL.rds = redis.createClient();
    app.listen(8087);
}
