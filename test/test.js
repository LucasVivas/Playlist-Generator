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
    it('Should ', (done) => {
      chai.request(server)
        .get('/playlist/1')
      //  .query({ number: 10, divider: 0 })
        .end((err, res) => {
          console.log(err);
          console.log(res.statusCode);
          testAsync(done, (() => {
            expect(res).to.have.status(404);
          }));
        });
    });
  });

  describe('POST /playlist/{playlist_id}', () => {
    it('Should ', (done) => {
      assert.equal(1 + 1, 2);
      done();
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
            expect(res).to.have.status(40);
          }));
        });
    });
  });
});
