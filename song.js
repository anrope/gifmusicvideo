var JSON = require('JSON')

var storage = require('./storage')

module.exports = function(req, res) {
    // Get gif placement info from the backend for a song
    rds = GLOBAL.rds;
    song_name = req.params.song_name;
    song_id = req.body.song_id;
    song_key = storage.songMakeKey(song_name);
    rds.get(song_key, function (err, song) {
        if (!song) {
            song = JSON.stringify({
                'project_id': 'whatever',
                'soundcloud_id': song_id,
                'gifs': []
            });
            
            rds.set(song_key, song);
        }

        res.send(song)
    });
};
