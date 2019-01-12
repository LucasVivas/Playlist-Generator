const playlists = require('../controllers/playlist.controller.js');

module.exports = (app) => {
  // GET /playlists
  app.get('/playlists/:user_id', playlists.findAll);

  // DELETE /playlists
  app.delete('/playlists/:user_id', playlists.deleteAll);

  // POST /playlist
  app.post('/playlist/:user_id', playlists.create);

  // GET /playlist/{playlist_id}
  app.get('/playlist/:user_id/:playlist_id', playlists.findOne);

  // PUT /playlist/{playlist_id}
  app.put('/playlist/:user_id/:playlist_id', playlists.update);

  // DELETE /playlist/{playlist_id}
  app.delete('/playlist/:user_id/:playlist_id', playlists.delete);
};
