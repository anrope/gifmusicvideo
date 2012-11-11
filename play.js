var request = require('request')
var JSON = require('JSON')

var soundcloud_url_base = "http://api.soundcloud.com/resolve.json?" +
    "client_id=b60ac37afa8549e97f3d5e7d0fce15f5&url=http://soundcloud.com/";

module.exports = function(req, res) {
    user = req.params.user;
    song_name = req.params.song_name;
    
    soundcloud_url = soundcloud_url_base + user + "/" + song_name
    request(soundcloud_url, function (err, soundcloud_res, body) {
        res.render('play', {
            'soundcloud_payload': body
        });
    });
};
