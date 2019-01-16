process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const server = 'http://localhost:8080';

const userId = 'myUsername';
const userJSON = { username: userId, mail: 'mymail1@mail.fr', password: 'myPassword' };

const urlMultiple = `/playlists/${userId}`;
const urlMultipleFalseUser = '/playlists/random';
const urlSingle = `/playlist/${userId}`;
const urlSingleFalseUser = '/playlist/random';
const urlUserIdParam = '/playlist_id';

const name1 = 'myName1';
const name2 = 'myName2';
const description1 = 'myDescription1';
const description2 = 'myDescription2';
const genre1 = 'myGenre1';
const genre2 = 'myGenre2';

const playlistJSON1 = {
  name: name1, description: description1, genre: genre1, owner: userId,
};
const playlistJSON2 = {
  name: name2, description: description2, genre: genre2, owner: userId,
};

chai.use(chaiHttp);

function testAsync(done, fn) {
  try {
    fn();
    done();
  } catch (err) {
    done(err);
  }
}

describe('Playlist', () => {
  before((done) => {
    chai.request(server)
      .post('/user')
      .send(userJSON)
      .end(() => {
        done();
      });
  });
  beforeEach((done) => {
    chai.request(server)
      .delete(urlMultiple)
      .end(() => {
        done();
      });
  });
  describe(`GET ${urlMultiple}`, () => {
    it('Should get an Array with 2 playlist (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(playlistJSON2)
            .end(() => {
              chai.request(server)
                .get(urlMultiple)
                .end((err, res) => {
                  testAsync(done, (() => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal([playlistJSON1, playlistJSON2]);
                  }));
                });
            });
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlMultipleFalseUser}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`DELETE ${urlMultiple}`, () => {
    it('Should delete every playlists', (done) => {
      chai.request(server)
        .delete(urlMultiple)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .delete(urlMultipleFalseUser)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`GET ${urlSingle}${urlUserIdParam}`, () => {
    it('Should get the playlist (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .get(`${urlSingle}/${name1}`)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equals(playlistJSON1);
              }));
            });
        });
    });
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingle}/2`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingleFalseUser}/${name1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`POST ${urlSingle}`, () => {
    it('Should add a playlist (Code: 201)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
    });
    it('Should cannot add a playlist because already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(playlistJSON1)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(409);
              }));
            });
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .post(`${urlSingleFalseUser}`)
        .send(playlistJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`PUT ${urlSingle}${urlUserIdParam}`, () => {
    it('Should modify a playlist (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingle}/${name1}`)
            .send(playlistJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
              }));
            });
        });
    });
    it('Should modify an undefined playlist (Code: 404)', (done) => {
      chai.request(server)
        .put(`${urlSingle}/${name1}`)
        .send(playlistJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingleFalseUser}/${name1}`)
            .send(playlistJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(404);
              }));
            });
        });
    });
    it('Should cannot modify a playlist into another who already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(playlistJSON2)
            .end(() => {
              chai.request(server)
                .put(`${urlSingle}/${name1}`)
                .send(playlistJSON2)
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
    it('Should delete an playlist (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(playlistJSON1)
        .end(() => {
          chai.request(server)
            .delete(`${urlSingle}/${name1}`)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
              }));
            });
        });
    });
    it('Should cannot delete a playlist because doesn\'t exist (Code: 404)', (done) => {
      chai.request(server)
        .delete(`${urlSingle}/${name1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .delete(`${urlSingleFalseUser}/${name1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });
});
