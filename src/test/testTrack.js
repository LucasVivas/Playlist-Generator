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

describe('Track', () => {
  beforeEach((done) => {
    chai.request(server)
      .delete('/tracks')
      .end(() => {
        done();
      });
  });

  describe('GET /tracks/{playlist_id}', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/track')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });

  describe('DELETE /tracks/{playlist_id}', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/track')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });

  describe('GET /track/{playlist_id}/{track_id}', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/track')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });

  describe('POST /track/{playlist_id}', () => {
    // TODO:
  });

  describe('PUT /track/{playlist_id}/{track_id}', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/track')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });

  describe('DELETE /track/{playlist_id}/{track_id}', () => {
    // it('Should ', (done) => {
    //   chai.request(server)
    //     .post('/track')
    //     .send(playlist)
    //     .end((err, res) => {
    //       testAsync(done, (() => {
    //         expect(res).to.have.status(409);
    //       }));
    //     });
    // });
  });
});
