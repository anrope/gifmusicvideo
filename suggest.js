var JSON = require('JSON')

//var images = require('./images.json')
var images = require('./allimages.json')
var specials = {
    '50-cent': require('./50-cent.json'),
    'bad-girls': require('./bad-girls.json'),
    'paper-planes': require('./paper-planes.json'),
    'zedd': require('./zedd.json')
};

var base_url = "http://alizweb.s3.amazonaws.com/gifmusicvideo/"

module.exports = function (req, res) {
    user = req.params.user;
    song_name = req.params.song_name;

    suggest_images = images

    for (sp in specials) {
        if (song_name.indexOf(sp) != -1) {
            console.log(sp)
            suggest_images = specials[sp]
            break;
        }
    }

    console.log(suggest_images)

    suggestions = []

    for (var i = 0; i < 10; i++) {
        index = Math.floor(Math.random() * suggest_images.length);
        suggestions.push(suggest_images[index]);
    }

    gifs = {
        "base_url": base_url,
        "images": suggestions
    }

    res.send(JSON.stringify(gifs));
};
