var s3_gifs = require('./s3_gifs.json')

module.exports = function (req, res) {
    res.send(s3_gifs);
};
