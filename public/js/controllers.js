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
        $scope.base_url = data.base_url;

        image_slots = Math.floor(($('#side_bottom').width() / 140) - 5);
        console.log('image_slots ' + image_slots + ' ' + $('#side_bottom').width());

        $scope.images = data.images.slice(0, image_slots);
        available_images = data.images.slice(image_slots);

        setTimeout(setUpDrag, 0);
    });

    $('#suggest_more').click(function() {
        $('.gif_box').each(function(index) {
            /*
            new_image = available_images.pop()
            if (isempty(new_image)) {
                suggest_more();
                new_image = '/img/loading.gif';
            };
            */
            new_image = "/img/loading.gif"
            $(this).attr('style', 'background-image: url(' + new_image + ');');
        });

        return false;
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
}
