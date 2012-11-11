function PlayerCtrl($scope, $http) {
    var m = window.location.pathname.match(/\/song\/([^\/]+)\/([^\/]+)/);
    if (m.length < 2) {
        alert('Invalid song path')
        return;
    }
    var user = m[1];
    var songname = m[2];
    console.log(user, songname);

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
        setTimeout(setUpDrag, 0);
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
        }
    });

    var nextImageInStrip = 0;
    function triggerTime(ms) {
        renderNewImages(ms);
        removePastImages(ms);
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
            if (rightPosition) {
                
            }
        });
        
    }

   
}
