var storage = require('./storage')

module.exports = function(req, res) {
    // Get gif placement info from the backend for a song
    rds = GLOBAL.rds;
    song = req.params.song_id;
    rds.get(storage.songMakeKey(song), function (err, reply) {
        res.send(reply)
    });
};
