express = require('express');
var app = express();

app.post('/1/submit', function(req, res) {
    // send gif info to the backend
    checkOverlap()
});

app.get('/1/meta', function(req, res) {
    // Get gif placement info from the backend for a song
    res.send('GIF music video\n');
}

function checkOverlap(gifmeta, songmeta) {
}

app.listen(8087);
