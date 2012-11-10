var express = require('express');
var redis = require('redis');
var JSON = require('JSON');

var rds = redis.createClient();

var app = express();
app.use(express.bodyParser());

var my_test_object =
{
    'project_id': 'my remix of gangnam style',
    'soundcloud_id': 243134, // song on soundcloud
    'gifs': [
        {
            'user': 'anrope',
            'gif': '/path/to/gif.gif', // path on server
            'timestamp': 134, // seconds
        },
        {
            'user': 'ted',
            'gif': '/path/gif2.gif',
            'timestamp': 235,
        }
    ]
};

rds.set('sng::gangnam-style', JSON.stringify(my_test_object))

app.post('/1/submit/:song_id/', function(req, res) {
    // send gif info to the backend
    //checkOverlap()
    //pushtoredis()
    user = req.body.user;
    gif_file = req.body.gif;
    timestamp = req.body.timestamp;

    gif = {
        'user': user,
        'gif': gif_file,
        'timestamp': timestamp
    };

    song_id = req.params.song_id;
    song_key = songMakeKey(song_id);
    rds.get(song_key, function (err, song) {
        song = JSON.parse(song)
        conflict = checkOverlap(gif, song)
        if (!conflict) {
            integrateGIF(gif, song);
            song = JSON.stringify(song);
            rds.set(song_key, song);
        }

        res.send('true\n');
    });
});

function integrateGIF(gif, song) {
    song.gifs.push(gif)
}

function checkOverlap(gif, song) {
    for (var g in song.gifs) {
        if ((gif.timestamp > g.timestamp) && 
            (gif.timestamp < g.timestamp + 3)) {
            
            return true;
        }
    }

    return false;
}

//app.get('/1/meta/:song/:project', function(req, res) {
app.get('/1/meta/:song_id/', function(req, res) {
    // Get gif placement info from the backend for a song
    song = req.params.song_id;
    rds.get(songMakeKey(song), function (err, reply) {
        res.send(reply)
    });
});

function songMakeKey(song) {
    return "sng::" + song;
}

app.listen(8087);
