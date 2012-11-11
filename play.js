module.exports = function(req, res) {
    res.sendfile(__dirname + '/public/play.html');
};