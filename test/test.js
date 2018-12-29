process.env.NODE_ENV = 'test';

const assert = require('assert');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Playlist', () => {
  beforeEach((done) => {
    chai.request('http://localhost:8080')
      .delete('/playlists');
    done();
  });

  describe('GET /playlist/{playlist_id}', () => {
    it('should ', () => {
      chai.request('http://localhost:8080')
        .get('/playlist/1')
        .end((err, res) => {
          expect(res).to.have.status(100);
          done();
        });
    });
  });

  describe('POST /playlist/{playlist_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('PUT /playlist/{playlist_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('DELETE /playlist/{playlist_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('POST /playlist', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('GET /playlist/{playlist_id}/{track_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('PUT /playlist/{playlist_id}/{track_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('DELETE /playlist/{playlist_id}/{track_id}', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('GET /playlists', () => {
    it('should ', () => {
      assert.equal(1 + 1, 2);
    });
  });

  describe('DELETE /playlists', () => {
    it('should delete every playlists', () => {
      chai.request('http://localhost:8080')
        .delete('/playlists')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
