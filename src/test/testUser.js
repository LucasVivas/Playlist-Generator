process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const server = 'http://localhost:8080';

const user1 = { mail: 'mymail1@mail.fr', username: 'myUsername1', password: 'myPassword1' };
const user2 = { mail: 'mymail2@mail.fr', username: 'myUsername2', password: 'myPassword2' };

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
  beforeEach((done) => {
    chai.request(server)
      .delete(urlMultiple)
      .end(() => {
        done();
      });
  });

  describe(`GET ${urlMultiple}`, () => {
    it('Should get an Array with 2 user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(user1);
      chai.request(server)
        .post(urlSingle)
        .send(user2);
      chai.request(server)
        .get(urlMultiple)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal([]);
          }));
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
        .send(user1);
      chai.request(server)
        .get(`${urlSingle}/1`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equals(user1);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingle}/2`)
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
        .send(user1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
    });
    it('Should cannot add a user because already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(user1);
      chai.request(server)
        .post(urlSingle)
        .send(user1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(409);
          }));
        });
    });
  });

  describe(`PUT ${urlSingle}${urlUserIdParam}`, () => {
    it('Should modify an user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(user1);
      chai.request(server)
        .put(`${urlSingle}/1`)
        .send(user2)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
    it('Should modify an undefined user (Code: 404)', (done) => {
      chai.request(server)
        .put(`${urlSingle}/1`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should cannot modify an user into another who already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(user1);
      chai.request(server)
        .post(urlSingle)
        .send(user2);
      chai.request(server)
        .put(`${urlSingle}/1`)
        .send(user2)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(409);
          }));
        });
    });
  });

  describe(`DELETE ${urlSingle}${urlUserIdParam}`, () => {
    it('Should delete an user (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(user1);
      chai.request(server)
        .delete(`${urlSingle}/1`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
    it('Should cannot add a user because already exist (Code: 404)', (done) => {
      chai.request(server)
        .delete(`${urlSingle}/1`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });
});
