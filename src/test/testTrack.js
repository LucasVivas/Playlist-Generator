process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const server = 'http://localhost:8080';

const userId = 'myUsername';
const userJSON = { username: userId, mail: 'mymail1@mail.fr', password: 'myPassword' };

const playlistId = 'myPlaylist';
const playlistJSON = { name: playlistId, description: 'myDescription', genre: 'myGenre' };

const urlMultiple = `/tracks/${userId}/${playlistId}`;
const urlMultipleFalseUser = `/tracks/random/${playlistId}`;
const urlMultipleFalsePlaylist = `/tracks/${userId}/random`;
const urlSingle = `/track/${userId}/${playlistId}`;
const urlSingleFalseUser = `/track/random/${playlistId}`;
const urlSingleFalsePlaylist = `/track/${userId}/random`;
const urlUserIdParam = '/playlist_id';

const name1 = 'myName1';
const name2 = 'myName2';
const artist1 = 'myArtist1';
const artist2 = 'myArtist2';
const time1 = 10;
const time2 = 20;

const trackJSON1 = {
  name: name1, artist: artist1, time: time1,
};
const trackJSON2 = {
  name: name2, artist: artist2, time: time2,
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

describe('Track', () => {
  before((done) => {
    chai.request(server)
      .post('/user')
      .send(userJSON)
      .end(() => {
        chai.request(server)
          .post(`/playlist/${userId}`)
          .send(userJSON)
          .end(() => {
            done();
          });
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
    it('Should get an Array with 2 tracks (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(trackJSON2)
            .end(() => {
              chai.request(server)
                .get(urlMultiple)
                .end((err, res) => {
                  testAsync(done, (() => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal([trackJSON1, trackJSON2]);
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
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlMultipleFalsePlaylist}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe(`DELETE ${urlMultiple}`, () => {
    it('Should delete every tracks (code: 200)', (done) => {
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
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .delete(urlMultipleFalsePlaylist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('GET /track/{playlist_id}/{track_id}', () => {
    it('Should get the track (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .get(`${urlSingle}/${name1}`)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equals(trackJSON1);
              }));
            });
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
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingleFalsePlaylist}/${name1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any track (Code: 404)', (done) => {
      chai.request(server)
        .get(`${urlSingle}/${name2}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('POST /track/{playlist_id}', () => {
    it('Should add a track (Code: 201)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
    });
    it('Should cannot add a track because already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(trackJSON1)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(409);
              }));
            });
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .post(urlSingleFalseUser)
        .send(trackJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .post(urlSingleFalsePlaylist)
        .send(trackJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('PUT /track/{playlist_id}/{track_id}', () => {
    it('Should modify a track (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingle}/${name1}`)
            .send(trackJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(200);
              }));
            });
        });
    });
    it('Should modify an undefined track (Code: 404)', (done) => {
      chai.request(server)
        .put(`${urlSingle}/${name1}`)
        .send(trackJSON1)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    it('Should not found any user (Code: 404)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingleFalseUser}/${name1}`)
            .send(trackJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(404);
              }));
            });
        });
    });
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .put(`${urlSingleFalsePlaylist}/${name1}`)
            .send(trackJSON2)
            .end((err, res) => {
              testAsync(done, (() => {
                expect(res).to.have.status(404);
              }));
            });
        });
    });
    it('Should cannot modify a track into another who already exist (Code: 409)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
        .end(() => {
          chai.request(server)
            .post(urlSingle)
            .send(trackJSON2)
            .end(() => {
              chai.request(server)
                .put(`${urlSingle}/${name1}`)
                .send(trackJSON2)
                .end((err, res) => {
                  testAsync(done, (() => {
                    expect(res).to.have.status(409);
                  }));
                });
            });
        });
    });
  });

  describe('DELETE /track/{playlist_id}/{track_id}', () => {
    it('Should delete a track (Code: 200)', (done) => {
      chai.request(server)
        .post(urlSingle)
        .send(trackJSON1)
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
    it('Should cannot delete a track because doesn\'t exist (Code: 404)', (done) => {
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
    it('Should not found any playlist (Code: 404)', (done) => {
      chai.request(server)
        .delete(`${urlSingleFalsePlaylist}/${name1}`)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });
});
