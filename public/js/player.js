var player = (function() {
    var sound;

    SC.initialize({
        client_id: appConfig.scClientId,
        redirect_uri: appConfig.scRedirectURI
    });

    return {
        init: function(song) {
            SC.stream('/tracks/' + song.id, function(s) {
                sound = s;
            });
        },
        play: function() {
            sound.play();
        },
        pause: function() {
            sound.pause();
        }
    };
}());