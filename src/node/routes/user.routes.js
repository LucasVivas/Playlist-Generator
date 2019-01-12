const users = require('../controllers/user.controller.js');

module.exports = (app) => {
  // GET /users
  app.get('/users', users.findAll);

  // DELETE /users
  app.delete('/users', users.deleteAll);

  // POST /user
  app.post('/user', users.create);

  // GET /user/{user_id}
  app.get('/user/:user_id', users.findOne);

  // PUT /user/{user_id}
  app.put('/user/:user_id', users.update);

  // DELETE /user/{user_id}
  app.delete('/user/:user_id', users.delete);
};
