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
            $('#gif_inner').stop();
        } else {
            player.play();
            $this.addClass('playing');
            var inner_width = -(currentSong.duration * .2);
            $('#gif_inner').animate({
                'left' : inner_width
            }, currentSong.duration, 'linear');
        }
    });

    var nextImageInStrip = 0;
    var lastRemoveCheck = 0;
    function triggerTime(ms) {
        renderNewImages(ms);
        // Only remove images every second
        if (ms - 1000 > lastRemoveCheck) {
            lastRemoveCheck = ms;
            removePastImages(ms);
        }
    }

    var imageBuffer = [];

    function renderNewImages(ms) {
        var loadBuffer = 8; //sec
        var renderBuffer = 1; //sec
        var max = ms + loadBuffer*1000;
        var gifs = $scope.song.gifs;
        for(var i=nextImageInStrip; i < gifs.length && gifs[i].timestamp < max; i++) {
            var gif = gifs[i];
            var img = bufferImage(gif.url);
            setTimeout(function() {
                addImage(gif, ms);
            }, (loadBuffer - renderBuffer) * 1000);
            nextImageInStrip++;
        }
    }

    function bufferImage(url) {
        var img = new Image();
        img.src = url;
        return img;
    }

    function addImage(gif, ms) {
        
    }

    function removePastImages(ms) {
        $('.gif_placed_box').each(function() {
            var $item = $(this);
            var rightPosition = parseInt($item.css('left')) + parseInt($item.css('width'));
            if (rightPosition < 0) {
                $item.remove();
            }
        });
        
    }

    
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
