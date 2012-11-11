var images = require('./images.json')

var s3_base = "http://s3.ijfoqjriw.com"

module.exports = function (req, res) {
    res.send(images);
};
