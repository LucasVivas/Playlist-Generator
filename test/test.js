process.env.NODE_ENV = 'test';

const assert = require('assert');

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;


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
  const server = 'http://localhost:8080';
  beforeEach((done) => {
    chai.request(server)
      .delete('/playlists');
    done();
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
  });

  describe('POST /playlist/{playlist_id}', () => {
    it('Should create a playlist (code: 201)', (done) => {
      chai.request(server)
        .post('/playlist')
        .query({ name: 'myplaylist', description: 'mydescription' })
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
        .query({ name: 'myplaylist', description: 'mydescription' })
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(201);
          }));
        });
      // Create a conflit because the paylist already exists
      chai.request(server)
        .post('/playlist')
        .query({ name: 'myplaylist', description: 'mydescription' })
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(409);
          }));
        });
    });
  });

  describe('PUT /playlist/{playlist_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('DELETE /playlist/{playlist_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('POST /playlist', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('GET /playlist/{playlist_id}/{track_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('PUT /playlist/{playlist_id}/{track_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('DELETE /playlist/{playlist_id}/{track_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('GET /playlists', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
    });
  });

  describe('DELETE /playlists', () => {
    it('Should delete every playlists', (done) => {
      chai.request(server)
        .delete('/playlists')
      //  .query({ number: 10, divider: 0 })
        .end((err, res) => {
          testAsync(done, (() => {
            expect(res).to.have.status(200);
          }));
        });
    });
  });
});
