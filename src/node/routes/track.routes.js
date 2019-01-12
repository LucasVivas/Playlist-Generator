const tracks = require('../controllers/track.controller.js');

module.exports = (app) => {
  // GET /tracks
  app.get('/tracks/:user_id/:playlist_id', tracks.findAll);

  // DELETE /tracks
  app.delete('/tracks/:user_id/:playlist_id', tracks.deleteAll);

  // POST /track
  app.post('/track/:user_id/:playlist_id', tracks.create);

  // GET /track/{track_id}
  app.get('/track/:user_id/:playlist_id/:track_id', tracks.findOne);

  // PUT /track/{track_id}
  app.put('/track/:user_id/:playlist_id/:track_id', tracks.update);

  // DELETE /track/{track_id}
  app.delete('/track/:user_id/:playlist_id/:track_id', tracks.delete);
};
