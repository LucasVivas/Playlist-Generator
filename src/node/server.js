/* eslint import/no-unresolved: [2, { ignore: ['\.img$'] }] */
const express = require('express');
// const ejs = require('ejs');
// to use the log of all the request
const morgan = require('morgan');
// for cross origin
const cors = require('cors');

const DBASE_NAME = 'Playlist-Generator';
const collection = 'playlists';
const MONGO_URL = 'mongodb://mongo:27017';

const MongoClient = require('mongodb').MongoClient;

const app = express();

const playlistExist = async function playlistExist() {
  return false;
};

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send('bonsoir toi');
});

/*
 * /playlist
 */

// add a new playlist
app.post('/playlist', async (req, res) => {
  const newPlaylist = req.body;
  let responseBody = {};

  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  const db = client.db(DBASE_NAME);


  // check if the playlist already exists
  if (await playlistExist(newPlaylist.name)) {
    res.status(409);
    responseBody.error = `Playlist named : ${newPlaylist.name} already exist`;
  } else {
    res.status(201);
    responseBody = newPlaylist;
  }
  res.send(responseBody);
});

/*
 * /playlist/:playlist_id
 */

// get a playist with the id 'palylist_id'
app.get('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const responseBody = {};
  // get the name and the description of the playlist needed.
  console.log(playlistId);

  // if the playlist doesn't exist
  if (true) {
    res.status(404);
    responseBody.error = 'Playlist does not exist';
  } else {
    res.status(200);
  }

  res.send(responseBody);
});


// post a new track in the playlist
app.post('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const track = req.body;

  const responseBody = track;

  /*
  * add a new track in the database and return the id of the tracks, and if
  * the track already exists still return the id of the track.
  */
  console.log(playlistId);

  res.status(201);
  res.send(responseBody);
});

app.put('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;

  const responseBody = {};

  if (await playlistExist(newPlaylist.name)) {
    res.status(409);
    responseBody.error = `Playlist named : ${newPlaylist.name} already exist`;
  } else if (false) { // not found
    res.status(404);
    responseBody.error = `Playlist n °${playlistId} does not found`;
  } else {
    res.status(200);
  }
  res.send(responseBody);
});

app.delete('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const responseBody = {};

  // check the number of lines deleted in the playlist table
  if (false) {
    res.status(404);
    responseBody.error = `Playlist n °${playlistId} does not found`;
  } else {
    res.status(200);
  }

  res.send(responseBody);
});

/*
 * /playlist/:playlist_id/:track_id
 */

// IMPORTANT track_id signifie l'emplacement du son dans la playlist

app.get('/playlist/:playlist_id/:track_id', async (req, res) => {
  console.log(req);
  res.send('/playists');
});

app.put('/playlist/:playlist_id/:track_id', async (req, res) => {
  console.log(req);
  res.send('/playists');
});

app.delete('/playlist/:playlist_id/:track_id', async (req, res) => {
  console.log(req);
  res.send('/playists');
});

/*
 * /playlists
 */

app.get('/playlists', async (req, res) => {
  console.log(req);
  res.send('/playists');
});

app.delete('/playlists', async (req, res) => {
  res.status(200);
  res.send('/playists');
});


app.use((req, res/* , next */) => {
  res.status(404).send('Page introuvable !');
  console.log('Page introuvable !!!!!');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Example app listening on port 8080!');
});
