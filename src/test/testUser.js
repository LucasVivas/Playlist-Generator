process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');


const chai = require('chai');
const chaiHttp = require('chai-http');
const dbConfig = require('../node/config/database.config.js');
const User = require('../node/models/user.model.js');

const expect = chai.expect;

const server = 'http://localhost:8080';

const username1 = 'myUsername1';
const username2 = 'myUsername2';
const mail1 = 'mymail1@mail.fr';
const mail2 = 'mymail2@mail.fr';
const password1 = 'myPassword1';
const password2 = 'myPassword2';

const userJSON1 = { username: username1, mail: mail1, password: password1 };
const userJSON2 = { username: username2, mail: mail2, password: password2 };

const userSchema1 = new User({
  _id: username1,
  mail: mail1,
  password: password1,
});
const userSchema2 = new User({
  _id: username2,
  mail: mail2,
  password: password2,
});

const urlMultiple = '/users';
const urlSingle = '/user';
const urlUserIdParam = '/user_id';

chai.use(chaiHttp);

function testAsync(done, fn) {
  try {
    fn();
    done();
  } catch (err) {
    done(err);
  }
}

describe('User', () => {
  before((done) => {
    mongoose.connect(dbConfig.testUrl, {
      useNewUrlParser: true,
    }).then(() => {
      console.log('Successfully connected to the database');
    }).catch((err) => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
    });
    done();
  });
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      if (err !== null) {
        console.log(err);
      }
      done();
    });
  });

  describe(`GET ${urlMultiple}`, () => {
    it('Should get an Array with 2 user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(userJSON2)
            .end(() => {
              chai.request(server)
                .get(urlMultiple)
                .end((err, res) => {
                  testAsync(done, (() => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal([userJSON1, userJSON2]);
                  }));
                });
            });
        });
    });
  });

  describe(`DELETE ${urlMultiple}`, () => {
    it('Should delete the db (Code: 200)', (done) => {
      chai.request(server)
        .delete(urlMultiple)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
  });

  describe(`GET ${urlSingle}${urlUserIdParam}`, () => {
    it('Should get the user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .get(`${urlSingle}/${username1}`)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equals(userJSON1);
              }));
            });
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingle}/${username2}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`POST ${urlSingle}`, () => {
    it('Should add an user (Code: 201)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
    });
    it('Should cannot add a user because already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(userJSON1)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(409);
              }));
            });
        });
    });
  });

  describe(`PUT ${urlSingle}${urlUserIdParam}`, () => {
    it('Should modify an user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingle}/${username1}`)
            .send(userJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
              }));
            });
        });
    });
    it('Should modify an undefined user (Code: 404)', (done) => {
      chai.request(server)
        .put(`${urlSingle}/${username1}`)
        .send(userJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should cannot modify an user into another who already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(userJSON2)
            .end(() => {
              chai.request(server)
                .put(`${urlSingle}/${username1}`)
                .send(userJSON2)
                .end((err, res) => {
                  testAsync(done, (() => {
                    expect(res).to.have.status(409);
                  }));
                });
            });
        });
    });
  });

  describe(`DELETE ${urlSingle}${urlUserIdParam}`, () => {
    it('Should delete an user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(userJSON1)
        .end(() => {
          chai.request(server)
            .delete(`${urlSingle}/${username1}`)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
              }));
            });
        });
    });
    it('Should cannot delete a user because doesn\'t exist (Code: 404)', (done) => {
      chai.request(server)
        .delete(`${urlSingle}/${username1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });
});
