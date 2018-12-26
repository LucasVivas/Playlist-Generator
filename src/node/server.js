/*jshint esversion: 6 */

const express = require('express');
//const ejs = require('ejs');
//to use the log of all the request
const morgan = require('morgan');
//for cross origin
const cors = require('cors');

const rootdir = '/home/node/app/';

const app = express();

//create a client to connect to postgresql
const {
    Client
} = require('pg');

{
    let client = new Client();

    client.connect();

    client.query('SELECT $1::text as message', ['Connection successful with postgresql!'], (err, res) => {
        console.log(err ? err.stack : res.rows[0].message);
        client.end();
    });
}

async function pgQuery(text) {
    let client = new Client();
    var result;
    await client.connect();
    try {
        result = await client.query(text);
    } catch (err) {
        throw parseInt(err.code);
    } finally {
        await client.end();
    }
    return result;
}

async function playlistExist(name) {
    let PG_request_check = 'SELECT name, description \
	FROM public."Playlists" \
	WHERE name = \'' + name + '\';';

    let result;
    try {
        result = await pgQuery(PG_request_check);
    } catch (errCode) {
        console.log("Error code : " + errCode);
    }

    if (result.rows.length === 0) {
        return false;
    }
    return true;
}

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', async function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.send('bonsoir toi');
});

/*
 * /playlist
 */

app.post('/playlist', async function(req, res) {
    let newPlaylist = req.body;
    let responseBody = {};

    if (!await playlistExist(newPlaylist.name)) {
        let PG_request = 'INSERT INTO public."Playlists"(name, description) \
            VALUES (\'' + newPlaylist.name + '\', \'' + newPlaylist.description + '\');'

        let result;
        try {
            result = await pgQuery(PG_request);
        } catch (errCode) {
            console.log("Error code : " + errCode);
        }
        res.status(201);
        responseBody = newPlaylist;
    } else {
        res.status(409);
        responseBody.error = "Playlist named : " + newPlaylist.name + " already exist";
    }

    res.send(responseBody);
});

/*
 * /playlist/:playlist_id
 */

app.get('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let responseBody = {};

    let PG_request_playlist = 'SELECT name, description \
    FROM public."Playlists" WHERE id=\'' + playlist_id + '\';';

    let result;
    try {
        result = await pgQuery(PG_request_playlist);
    } catch (errCode) {
        console.log("Error code : " + errCode);
    }

    let PG_request_tracks = 'SELECT name, artist, album \
    FROM public."Tracks", public."Playlist_tracks" \
    WHERE playlist_id = \'' + playlist_id + '\'';

    let anotherResult;
    try {
        anotherResult = await pgQuery(PG_request_tracks);
    } catch (errCode) {
        console.log("Error code : " + errCode);
    }

    if (result.rows.length === 0) {
        res.status(404);
        responseBody.error = 'Playlist does not exist';
    } else {
        res.status(200);
        responseBody = result.rows[0];
        responseBody.tracks = anotherResult.rows;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(responseBody);
});



app.post('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let body = req.body;
    let track_id = -1;

    let responseBody = body;

    let PG_request_insert = '    WITH cte AS( \
        INSERT INTO public."Tracks"(name, artist, album) \
        VALUES(\'' + body.name + '\', \'' + body.artist + '\', \'' + body.album + '\') \
        ON CONFLICT DO NOTHING RETURNING id \
    ) \
    SELECT NULL AS result \
    WHERE EXISTS(SELECT 1 FROM cte) \
    UNION ALL \
    SELECT id \
    FROM public."Tracks" \
    WHERE name = \'' + body.name + '\' AND artist = \'' + body.artist + '\' AND \
    album = \'' + body.album + '\' \
    AND NOT EXISTS (SELECT 1 FROM cte);';

    let result;
    try {
        result = await pgQuery(PG_request_insert);
    } catch (e) {
        console.log("Error code : " + e);
    }

    track_id = result.rows[0].result;

    let PG_request_link =
        'INSERT INTO public.\"Playlist_tracks\"(playlist_id, track_id) \
    VALUES (' + playlist_id + ' , ' + track_id + ');';

    try {
        await pgQuery(PG_request_link);
    } catch (errCode) {
        switch (errCode) {
            case 23503:
                console.log("23503 - Foreign key conflict");
                res.status(404);
                responseBody = {
                    'error': "Playlist not found"
                };
                break;
            case 23505:
                console.log("23505 - Unique conflict");
                res.status(409);
                responseBody = {
                    'error': "Track already in the playlist"
                };
            default:
                console.log('default ' + errCode);
        }
    }

    res.send(responseBody);
});

app.put('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let newPlaylist = req.body;

    let responseBody = {};

    if (!await playlistExist(newPlaylist.name)) {
        let PG_request = 'UPDATE public."Playlists" \
	       SET name=\'' + newPlaylist.name + '\', description=\'' + newPlaylist.description + '\' \
	          WHERE id=\'' + playlist_id + '\' RETURNING name, description;';

        try {
            result = await pgQuery(PG_request);
        } catch (errCode) {
            console.log('Error code  : ' + errCode);
        }

        if (result.rows.length === 0) {
            res.status(404);
            responseBody.error = "Playlist n \°" + playlist_id + " does not found";
        }
    } else {
        res.status(409);
        responseBody.error = "Playlist named : " + newPlaylist.name + " already exist";
    }
    res.send(responseBody);
});

app.delete('/playlist/:playlist_id', async function(req, res) {

});

/*
 * /playlist/:playlist_id/:track_id
 */

app.get('/playlist/:playlist_id/:track_id', async function(req, res) {

});

app.put('/playlist/:playlist_id/:track_id', async function(req, res) {

});

app.delete('/playlist/:playlist_id/:track_id', async function(req, res) {

});

/*
 * /playlists
 */

app.get('/playlists', async function(req, res) {

});

app.delete('/playlists', async function(req, res) {

});


app.use(function(req, res, next) {
    res.status(404).send('Page introuvable !');
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Example app listening on port 8080!');
});