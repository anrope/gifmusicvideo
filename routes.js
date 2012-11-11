var index = require('./index');
var gif = require('./gif');
var song = require('./song');

module.exports = function(app) {
  app.all('/', index);
  app.post('/1/gif/:song_id/', gif);
  app.get('/1/song/:song_id/', song);
}
