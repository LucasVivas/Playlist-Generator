/* eslint import/no-unresolved: [2, { ignore: ['\.img$'] }] */
const express = require('express');
// const ejs = require('ejs');
// to use the log of all the request
const morgan = require('morgan');
// for cross origin
const cors = require('cors');

const app = express();

// create a client to connect to postgresql
const {
  Client,
} = require('pg');

{
  const client = new Client();

  client.connect();

  client.query('SELECT $1::text as message', ['Connection successful with postgresql!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message);
    client.end();
  });
}

/*
 * Create a client to connect to the database and run a query and throw the
 * error code if there is an error and return the result of the query if it
 * passed.
 */

const pgQuery = async function (text) {
  const client = new Client();
  let result;
  await client.connect();
  try {
    result = await client.query(text);
  } catch (err) {
    throw parseInt(err.code, 10);
  } finally {
    await client.end();
  }
  return result;
};

/*
 * Run a postgresql query with the function pgQuery(text) and check if there is
 * an error during the execution of the query. Return the result of the query.
 */

const runQuery = async function (query) {
  let result;
  try {
    result = await pgQuery(query);
  } catch (errCode) {
    console.log(`Error code : ${errCode}`);
  }
  return result;
};

/*
 * check if a playlist with the name ('name') exist in the database
 */
const playlistExist = async function playlistExist(name) {
  const query = {
    text: 'SELECT name, description FROM public."Playlists" '
    + 'WHERE name = $1;',
    values: [name],
  };

  const result = await runQuery(query);

  if (result.rows.length === 0) {
    return false;
  }
  return true;
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

  // check if the playlist already exists
  if (await playlistExist(newPlaylist.name)) {
    res.status(409);
    responseBody.error = `Playlist named : ${newPlaylist.name} already exist`;
  } else {
    const query = {
      text: 'INSERT INTO public."Playlists"(name, description) '
      + 'VALUES ($1, $2);',
      values: [newPlaylist.name, newPlaylist.description],
    };

    // const result =
    await runQuery(query);

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
  let responseBody = {};

  // get the name and the description of the playlist needed.
  const query1 = {
    text: 'SELECT name, description '
    + 'FROM public."Playlists" '
    + 'WHERE id= $1;',
    values: [playlistId],
  };

  const result1 = await runQuery(query1);

  // get all the tracks within the playlist
  const query2 = {
    text: 'SELECT name, artist, album FROM public."Tracks", public."Playlist_tracks" WHERE playlist_id = $1',
    values: [playlistId],
  };

  const result2 = await runQuery(query2);

  // if the first result contains any thing it means that the playlist doesn't exist
  if (result1.rows.length === 0) {
    res.status(404);
    responseBody.error = 'Playlist does not exist';
  } else {
    res.status(200);
    // assign the first value of the array rows to responseBody
    ({ rows: [responseBody] } = result1);
    responseBody.tracks = result2.rows;
  }

  res.send(responseBody);
});


// post a new track in the playlist
app.post('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const track = req.body;
  let trackId = -1;
  let responseBody = track;

  /*
     * add a new track in the database and return the id of the tracks, and if
     * the track already exists still return the id of the track.
     */
  const query1 = {
    text: 'WITH cte AS( '
    + 'INSERT INTO public."Tracks"(name, artist, album) '
    + 'VALUES($1, $2, $3) '
    + 'ON CONFLICT DO NOTHING RETURNING id '
    + ') '
    + 'SELECT NULL AS result '
    + 'WHERE EXISTS(SELECT 1 FROM cte) '
    + 'UNION ALL '
    + 'SELECT id '
    + 'FROM public."Tracks" '
    + 'WHERE name = $1 AND artist = $2 AND album = $3 '
    + 'AND NOT EXISTS (SELECT 1 FROM cte);',
    values: [track.name, track.artist, track.album],
  };

  const result = await runQuery(query1);

  trackId = result.rows[0].result;

  // create the link between the playlist an the track
  const query2 = {
    text: 'INSERT INTO public."Playlist_tracks"(playlist_id, track_id) '
    + 'VALUES ($1, $2);',
    values: [playlistId, trackId],
  };

  try {
    await pgQuery(query2);
  } catch (errCode) {
    switch (errCode) {
      case 23503:
        console.log('23503 - Foreign key conflict');
        res.status(404);
        responseBody = {
          error: 'Playlist not found',
        };
        break;
      case 23505:
        console.log('23505 - Unique conflict');
        res.status(409);
        responseBody = {
          error: 'Track already in the playlist',
        };
        break;
      default:
        console.log(`Error code : ${errCode}`);
    }
  }

  res.send(responseBody);
});

app.put('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const newPlaylist = req.body;

  const responseBody = {};

  if (await playlistExist(newPlaylist.name)) {
    res.status(409);
    responseBody.error = `Playlist named : ${newPlaylist.name} already exist`;
  } else {
    const query = {
      text: 'UPDATE public."Playlists" '
      + 'SET name= $1, description= $2 '
      + 'WHERE id= $3 RETURNING name, description;',
      values: [newPlaylist.name, newPlaylist.description, playlistId],
    };

    const result = await runQuery(query);

    if (result.rows.length === 0) {
      res.status(404);
      responseBody.error = `Playlist n °${playlistId} does not found`;
    }
  }
  res.send(responseBody);
});

app.delete('/playlist/:playlist_id', async (req, res) => {
  const playlistId = req.params.playlist_id;
  const responseBody = {};

  const query = {
    text: 'DELETE FROM public."Playlists" '
    + 'WHERE id= $1; '
    + 'DELETE FROM public."Playlist_tracks" '
    + 'WHERE playlist_id=$1;',
    values: [playlistId],
  };

  const result = await runQuery(query);

  // check the number of lines deleted in the playlist table
  if (result[0].rowCount === 0) {
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
  const query = {
    text: 'TRUNCATE TABLE public."Playlist_tracks", public."Playlists", public."Tracks";',
    values: [],
  };
  const result = await runQuery(query);
  console.log(result);
  res.status(200);
  res.send('/playists');
});


app.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
  console.log(next);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Example app listening on port 8080!');
});
