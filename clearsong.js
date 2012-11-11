var storage = require('./storage')

module.exports = function (req, res) {
    rds = GLOBAL.rds;

    user = req.params.user;
    song_name = req.params.song_name;
    song_key = storage.songMakeKey(song_name);
    rds.del(song_key);
    res.send('true\n');
};
