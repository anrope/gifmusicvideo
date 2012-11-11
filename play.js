var soundcloud_url_base = "http://api.soundcloud.com/resolve.json?" +
    "client_id=CLIENT-ID&url=http://soundcloud.com/";
    
//http://soundcloud.com/ARTIST/SONG_NAME

module.exports = function(req, res) {
    soundcloud_url = soundcloud_url_base + "treble/shapeless-syncronicity"
    http.get(soundcloud_url, function(res) {
        console.log(res.body)
        res.render('play', {
            'soundcloud_payload': res.body
        });
    });
};
