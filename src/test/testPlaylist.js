process.env.NODE_ENV = 'test';

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const server = 'http://localhost:8080';
const playlist = { name: 'myPlaylist', description: 'myDescription' };

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
  beforeEach((done) => {
    chai.request(server)
      .delete('/playlists')
      .end(() => {
        done();
      });
  });
  describe('GET /playlists', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/playlist')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });

  describe('DELETE /playlists', () => {
    it('Should delete every playlists', (done) => {
      chai.request(server)
        .delete('/playlists')
      //  .send({ number: 10, divider: 0 })
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
  });

  describe('GET /playlist/{playlist_id}', () => {
    it('Should not find playlist because it doesn\'t exists (error: 404)', (done) => {
      chai.request(server)
        .get('/playlist/1')
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
    // TODO: another test
  });


  describe('PUT /playlist/{playlist_id}', () => {
    const newPlaylist = { name: 'myNewPlaylist', description: 'myNewDescription' };

    // TODO: everything
    beforeEach((done) => {
      chai.request(server)
        .post('/playlist')
        .send(playlist)
        .end((err, res) => {
          done();
        });
    });

    it('Should modify an existing playlist (code: 200)', (done) => {
      chai.request(server)
        .put('/playlist/1')
        .send(newPlaylist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });

    it('Should try to modify a playlist with the name of another one (code: 409)', (done) => {
      chai.request(server)
        .post('/playlist')
        .send(newPlaylist);
      chai.request(server)
        .put('/playlist/1')
        .send(newPlaylist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });

    it('Should try to modify a nil playlist (code: 404)', (done) => {
      chai.request(server)
        .put('/playlist/2')
        .send(newPlaylist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('DELETE /playlist/{playlist_id}', () => {
    it('Should delete a existing playlist (code: 200)', (done) => {
      chai.request(server)
        .post('/playlist')
        .send(playlist);
      chai.request(server)
        .delete('/playlist/1')
        .send(playlist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
    it('Should try to delete a nil playlist (code: 404)', (done) => {
      chai.request(server)
        .delete('/playlist/1')
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('POST /playlist', () => {
    it('Should create a playlist (code: 201)', (done) => {
      chai.request(server)
        .post('/playlist')
        .send(playlist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
    });
    it('Should conflict (code: 409)', (done) => {
      // Create a playlist
      chai.request(server)
        .post('/playlist')
        .send(playlist)
        .end((err, res) => {
          expect(res).to.have.status(201);
        });
      // Create a conflit because the paylist already exists
      chai.request(server)
        .post('/playlist')
        .send(playlist)
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(409);
          }));
        });
    });
  });
});
