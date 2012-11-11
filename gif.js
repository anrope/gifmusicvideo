var storage = require('./storage')
var logic = require('./logic')

module.exports = function (req, res) {
    rds = GLOBAL.rds;

    user = req.body.user;
    gif_file = req.body.gif;
    timestamp = req.body.timestamp;

    gif = {
        'user': user,
        'gif': gif_file,
        'timestamp': timestamp
    };

    song_id = req.params.song_id;
    song_key = storage.songMakeKey(song_id);
    rds.get(song_key, function (err, song) {
        song = JSON.parse(song)
        conflict = logic.checkOverlap(gif, song)
        if (!conflict) {
            logic.integrateGIF(gif, song);
            song = JSON.stringify(song);
            rds.set(song_key, song);
        }

        res.send('true\n');
    });
};
