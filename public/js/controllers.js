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
    var available_images = [];
    $http.get(suggest_api).success(function(data) {
        $scope.base_url = data.base_url;

        //image_slots = Math.floor(($('#side_bottom').width() / 140) - 9);
        image_slots = 3;
        console.log('image_slots ' + image_slots + ' ' + $('#side_bottom').width());

        $scope.images = data.images.slice(0, image_slots);
        available_images.push.apply(available_images, data.images.slice(image_slots));

        setTimeout(onReadyCallback, 0);
    });

    console.log('available images init')
    console.log(available_images)

    $('#suggest_more').click(function() {
        console.log('available images on suggest more');
        console.log(available_images);
        $('.gif_box').each(function(index) {
            new_image_obj = available_images.pop()
            if (!new_image_obj) {
                $http.get(suggest_api).success(function(data) {
                    $('.gif_box').each(function(index) {
                        if ($(this).attr('style').indexOf('loading.gif') != -1) {
                            new_image = $scope.base_url + data.images.pop().filename;
                            $(this).attr('style', 'background-image: url(' + new_image + ');');
                        };
                    });

                    available_images.push.apply(available_images, data.images);
                });
                new_image = '/img/loading.gif';
            } else {
                new_image = $scope.base_url + new_image_obj.filename;
            }
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
            $('#gif_inner').stop();
        } else {
            player.play(triggerTime);
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
            (function() {
                var gif = gifs[i];
                console.log(gif);
                var img = bufferImage(gif.gif);
                setTimeout(function() {
                    addImage(gif.gif, ms);
                }, (loadBuffer - renderBuffer) * 1000);
                nextImageInStrip++;
            }());
        }
    }

    function bufferImage(url) {
        var img = new Image();
        img.src = url;
    }

    function addImage(url, ms) {
        console.log(arguments);
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
    
    var position_to_timestamp = function(position) {
        return (position / $('#gif_inner').width()) * currentSong.duration;
    };
    
    var timestamp_to_position = function(timestamp) {
        return (timestamp / currentSong.duration) * $('#gif_inner').width();
    };
    
    // Post gif timestamp
    $scope.$on('gmbomt:gif_dropped', function(e, args) {
        post_gif_timestamp({
            gif_url: args.gif_url,
            position: args.position
        });
    });
    var post_gif_timestamp = function(args) {
        var url = '/1/dropgif/' + user + '/' + songname;
        $.post(url,
            {
                user: user,
                gif: args.gif_url,
                timestamp: position_to_timestamp(args.position),
                row: 1
            },
            function(data) {
                if (data.match(/true/)) {
                    console.log('POSTED TIMESTAMP YO');
            }
        });
    };
}
