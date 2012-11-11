function setUpDrag() {
    $('#edit_toggle').click( function() {
        if ( $('#gif_block').hasClass('expanded') ) {
            $('#gif_block').removeClass('expanded');
            $(this).text('focus');
            var window_height = $(window).height()
            var strip_height = window_height - $('#gif_strip').height();
            $('#gif_block').height(strip_height);
            $('#gif_inner').height(strip_height);
            var placer_height = strip_height;
            var placer_width = placer_height * 1.25;
            $('.gif_placed_box').css({
                'height' : placer_height,
                'width' : placer_width
            });
        } else {
            $('#gif_block').addClass('expanded').height('100%');
            $(this).text('contribute');
            var window_height = $(window).height()
            $('#gif_inner').height('100%');
            var placer_height = window_height;
            var placer_width = placer_height * 1.25;
            $('.gif_placed_box').css({
                'height' : placer_height,
                'width' : placer_width
            });
        }
    });
    // Set up strip height
    var window_height = $(window).height();
    var strip_height = window_height - $('#gif_strip').height();
    $('#gif_block').height(strip_height);
    $('.gif_box').draggable({
        opacity: 0.7, 
        helper: "clone",
        start: function() {
            var background_image = $(this).css('background-image');
            var placer_height = $('#gif_inner').height();
            var placer_width = placer_height * 1.25;
            $('#gif_strip').addClass('drag_in_progress');
            $('#gif_inner').append('<div id="placer"></div>');
            $('#placer').css({
                'background-image': background_image,
                'height': placer_height,
                'width': placer_width
            });
        },
        stop: function() {
            $('#placer').remove();
            $('#gif_strip').removeClass('drag_in_progress');
        },
        drag: function() {
            var scrolled = parseInt($('#gif_inner').css('left'), 10);
            var left_pos = ($('.ui-draggable-dragging').offset().left - 120) - scrolled;
            if ( left_pos < 0 ) {
                left_pos = 0;
            }
            $('#placer').css('left', left_pos);
        },
    });
    $('#gif_inner').droppable({
        over: function(e, ui){
            $('.ui-draggable-dragging').addClass('over');
            $('#placer').addClass('active');
        },
        out: function(e, ui){
            $('.ui-draggable-dragging').removeClass('over');
            $('#placer').removeClass('active');
        },
        drop: function(e, ui){
            $placer = $('#placer');
            var left_pos = $placer.css('left');
            var background_image = $placer.css('background-image');
            var background_url = background_image.replace('url(', '').replace(')', '');
            place_gif({
                left: left_pos,
                background_url: background_url
            });
            
            // Send angular event to post gif timestamp
            var scope = angular.element($('body')).scope();
            scope.$apply(function() {
                scope.$broadcast('gmbomt:gif_dropped', {
                    gif_url: background_url,
                    position: parseInt($('#gif_inner').children().last().css('left'), 10)
                });
            });
        }
    });
}

// Place a new gif on the strip
function place_gif (args) {
    $placer = $('#placer');
    $('#gif_inner').append('<div class="gif_placed_box placed"></div>');
    $('.placed').css({
        'left': args.left,
        'height': $placer.height(),
        'width': $placer.width(),
        'background-image': 'url(' + args.background_url + ')'
    }).removeClass('placed');
}