var JSON = require('JSON')

var images = require('./images.json')

var base_url = "http://alizweb.s3.amazonaws.com/gifmusicvideo/"

module.exports = function (req, res) {
    console.log('shaboom');

    gifs = {
        "base_url": base_url,
        "images": images.slice(0,10)
    }

    res.send(JSON.stringify(gifs));
};
