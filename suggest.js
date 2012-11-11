var JSON = require('JSON')

var images = require('./images.json')

var base_url = "http://alizweb.s3.amazonaws.com/gifmusicvideo/"

module.exports = function (req, res) {
    suggestions = []

    for (var i = 0; i < 10; i++) {
        index = Math.floor(Math.random() * images.length);
        suggestions.push(images[index]);
    }

    gifs = {
        "base_url": base_url,
        "images": suggestions
    }

    res.send(JSON.stringify(gifs));
};
