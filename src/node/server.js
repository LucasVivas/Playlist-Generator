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
        console.log(result);
    } catch (err) {
        console.log("---------------");
        console.log(err.stack);
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

    let PG_request_insert = 'INSERT INTO public."Tracks"(name, artist, album) \
            VALUES(\'' + body.name + '\', \'' + body.artist + '\', \'' + body.album + '\') \
                ON CONFLICT DO NOTHING RETURNING id';


    let result = await pgQuery(PG_request_insert);
    // TODO: check result
    track_id = result.rows[0].id;

    let PG_request_link =
        'INSERT INTO public.\"Playlist_tracks\"(playlist_id, track_id) \
    VALUES (' + playlist_id + ' , ' + track_id + ');';

    await pgQuery(PG_request_link);

    res.send(body);
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