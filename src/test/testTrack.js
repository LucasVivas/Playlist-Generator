process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const server = 'http://localhost:8080';

const userId = 'myUsername';
const userJSON = { username: userId, mail: 'mymail1@mail.fr', password: 'myPassword' };

const playlistId = 'myPlaylist';
const playlistJSON = {
  name: playlistId, description: 'myDescription', genre: 'myGenre', owner: userId,
};

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
  name: name1, artist: artist1, genre: genre1, owner: userId,
};
const trackJSON2 = {
  name: name2, artist: artist2, genre: genre2, owner: userId,
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
