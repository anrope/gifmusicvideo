function PlayerCtrl($scope, $http) {
    // Get GIF data for the song
    //$http.get(appConfig.context + '/1/song/').success(function(data) {
    //    $scope.phones = data;
    //});


    // Get GIF data for the song
    $http.get(appConfig.context + '/1/suggest/anrope/gangnam-style').success(function(data) {
        console.log(data);
        console.log('lol');
        $scope.suggest = data;
    });

    // Render player
    
}
