var JSON = require('JSON')

var storage = require('./storage')

module.exports = function(req, res) {
    // Get gif placement info from the backend for a song
    rds = GLOBAL.rds;
    song_id = req.params.song_id;
    song_key = storage.songMakeKey(song_id);
    rds.get(song_key, function (err, song) {
        if (!song) {
            song = JSON.stringify({
                'project_id': 'whatever',
                'soundcloud_id': 2341345,
                'gifs': []
            });

            //rds.set(song_key, song, function (err) {
            //}
        } else {
            res.send(song)
        }
    });
};
