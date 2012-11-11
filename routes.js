var index = require('./index');
var dropgif = require('./dropgif');
var song = require('./song');
var play = require('./play')
var fetchgif = require('./fetchgif');

module.exports = function(app) {
  app.all('/', index);
  app.post('/1/dropgif/:song_name/', dropgif);
  app.get('/1/song/:song_name/', song);
  app.get('/:song_name/', play);
  app.get('/1/fetchgif', fetchgif);
}
