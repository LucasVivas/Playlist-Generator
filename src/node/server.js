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
        console.log("-------RESULT--------");
        console.log(result);
    } catch (err) {
        console.log("-------ERROR--------");
        console.log(err.code);
        throw parseInt(err.code);
    } finally {
        await client.end();
    }
    return result;
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
    // INSERT INTO public."Playlists"(
    // name, description)
    // VALUES (?, ?);
});

/*
 * /playlist/:playlist_id
 */

app.get('/playlist/:playlist_id', async function(req, res) {
    // SELECT id, name, description
    // FROM public."Playlists" WHERE id=?;
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

    let result = await pgQuery(PG_request_insert);
    // TODO: check result
    track_id = result.rows[0].result;

    let PG_request_link =
        'INSERT INTO public.\"Playlist_tracks\"(playlist_id, track_id) \
    VALUES (' + playlist_id + ' , ' + track_id + ');';

    try {
        await pgQuery(PG_request_link);
    } catch (code) {
        switch (code) {
            case 23503:
                console.log("23503 - Foreign key conflict");
                res.status(404);
                responseBody = "Playlist not found";
                break;
            case 23505:
                console.log("23505 - Unique conflict");
                res.status(409);
                responseBody = "Track already in the playlist";
            default:
                console.log('default');
        }
    }

    res.send(responseBody);
});

app.put('/playlist/:playlist_id', async function(req, res) {

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