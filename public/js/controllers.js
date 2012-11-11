function PlayerCtrl($scope, $http) {
    var m = window.location.pathname.match(/\/song\/([^\/]+)\/([^\/]+)/);
    if (m.length < 2) {
        alert('Invalid song path')
        return;
    }
    var user = m[1];
    var songname = m[2];

    // Get GIF data for the song
    song_api = 'http://' + appConfig.context + '/1/song/' + 
        user + "/" + songname + "/";
    $http.get(song_api).success(function(data) {
        $scope.song = data;
    });

    // Get GIF data for the song
    suggest_api = 'http://' + appConfig.context + '/1/suggest/' + 
        user + "/" + songname + "/";
    $http.get(suggest_api).success(function(data) {
        $scope.suggest = data;
        setTimeout(onReadyCallback, 0);
    });

    player.init(currentSong);

    $('#gif_block').click(function() {
        var $this = $(this);
        if ($this.hasClass('playing')) {
            player.pause();
            $this.removeClass('playing');
        } else {
            player.play();
            $this.addClass('playing');
            var inner_width = -(currentSong.duration * .2);
            $('#gif_inner').animate({
                'left' : inner_width
            }, currentSong.duration, 'linear');
        }
    });
    
    function onReadyCallback() {
        setUpDrag();
        var inner_width = (currentSong.duration * .2);
        $('#gif_inner').width(inner_width);
    }
    
    // Post gif timestamp
    $scope.$on('gmbomt:gif_dropped', function(e, args) {
        post_gif_timestamp(args.gif_url);
    });
    var post_gif_timestamp = function(gif_url) {
        var url = '/1/dropgif/' + user + '/' + songname;
        $.post(url,
            {
                user: user,
                gif: gif_url,
                timestamp: -999,
                row: 1
            },
            function(data) {
                if (data.match(/true/)) {
                    console.log('POSTED TIMESTAMP YO');
            }
        });
    };
}
