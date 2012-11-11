var player = (function() {
    var sound;
    
    var interval;

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
        play: function(ticker) {
            sound.play();
            interval = setInterval(function() {
                ticker(sound.position);
            }, 500);
        },
        pause: function() {
            sound.pause();
            clearInterval(interval);
        }
    };
}());