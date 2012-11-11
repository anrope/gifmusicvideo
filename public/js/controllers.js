function PlayerCtrl($scope, $http) {
    
    // Get GIF data for the song
    //$http.get(appConfig.context + '/1/song/').success(function(data) {
    //    $scope.phones = data;
    //});


    // Get GIF data for the song
    $http.get(appConfig.context + '/1/fetchgifs/').success(function(data) {
        $scope.suggest = data;
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
