module.exports.integrateGIF = function (gif, song) {
    song.gifs.push(gif)
};

module.exports.checkOverlap = function(gif, song) {
    for (var g in song.gifs) {
        if ((gif.timestamp > g.timestamp) && 
            (gif.timestamp < g.timestamp + 3)) {
            
            return true;
        }
    }

    return false;
};
