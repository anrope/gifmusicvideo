$(document).ready( function() {
    $('#edit_toggle').click( function() {
        $('#gif_block').toggleClass('expanded');
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
            $('#gif_strip').addClass('drag_in_progress');
        },
        drag: function() {
            var left_pos = $('.ui-draggable-dragging').offset().left;
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
            var height = $placer.height();
            var width = $placer.width();
            var background_image = $placer.css('background-image');
            $('#gif_inner').append('<div class="gif_placed_box placed"></div>');
            $('.placed').css({
                'left': left_pos,
                'height': height,
                'width': width,
                'background-image': background_image
            }).removeClass('placed');
        }
    });
    $('.gif_placed_box').droppable({
        over: function(e, ui){
            console.log('over');
        }
    });
    $('#scroll').click(function() {
        $('#gif_inner').animate({
            'left' : '-2000px'
        }, 2000);
    });
});