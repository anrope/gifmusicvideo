var JSON = require('JSON')

var images = require('./images.json')

var base_url = "http://s3.ijfoqjriw.com"

module.exports = function (req, res) {
    gifs = {
        "base_url": base_url,
        "images": images
    }

    res.send(JSON.stringify(gifs));
};
