var index = require('./index');
var dropgif = require('./dropgif');
var song = require('./song');
var play = require('./play')
var suggest = require('./suggest');
var clearsong = require('./clearsong');

module.exports = function(app) {
  app.all('/', index);
  app.post('/1/dropgif/:user/:song_name', dropgif);
  app.get('/1/song/:user/:song_name', song);
  app.get('/song/:user/:song_name', play);
  app.get('/1/suggest/:user/:song_name', suggest);
  app.post('/1/clearsong/:user/:song_name', clearsong);
}
