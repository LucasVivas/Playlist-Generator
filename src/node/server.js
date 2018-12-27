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

/*
 * Create a client to connect to the database and run a query and throw the
 * error code if there is an error and return the result of the query if it
 * passed.
 */

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

/*
 * Run a postgresql query with the function pgQuery(text) and check if there is an error during the execution
 * of the query. Return the result of the query.
 */

async function runQuery(query) {
    let result;
    try {
        result = await pgQuery(query);
    } catch (errCode) {
        console.log("Error code : " + errCode);
    }
    return result;
}

/*
 * check if a playlist with the name ('name') exist in the database
 */
async function playlistExist(name) {
    let query = {
        text: 'SELECT name, description FROM public."Playlists" \
    	WHERE name = $1;',
        values: [name],
    }

    let result = await runQuery(query);

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

//add a new playlist
app.post('/playlist', async function(req, res) {
    let newPlaylist = req.body;
    let responseBody = {};

    // check if the playlist already exists
    if (await playlistExist(newPlaylist.name)) {
        res.status(409);
        responseBody.error = "Playlist named : " + newPlaylist.name + " already exist";
    } else {
        let query = {
            text: 'INSERT INTO public."Playlists"(name, description) \
                VALUES ($1, $2);',
            values: [newPlaylist.name, newPlaylist.description],
        }

        let result = await runQuery(query);

        res.status(201);
        responseBody = newPlaylist;
    }

    res.send(responseBody);
});

/*
 * /playlist/:playlist_id
 */

//get a playist with the id 'palylist_id'
app.get('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let responseBody = {};

    //get the name and the description of the playlist needed.
    let query1 = {
        text: 'SELECT name, description \
        FROM public."Playlists" WHERE id= $1;',
        values: [playlist_id],
    }

    let result1 = await runQuery(query1);

    //get all the tracks within the playlist
    let query2 = {
        text: 'SELECT name, artist, album \
        FROM public."Tracks", public."Playlist_tracks" \
        WHERE playlist_id = $1',
        values: [playlist_id],
    }

    let result2 = await runQuery(query2);

    //if the first result contains any thing it means that the playlist doesn't exist
    if (result1.rows.length === 0) {
        res.status(404);
        responseBody.error = 'Playlist does not exist';
    } else {
        res.status(200);
        responseBody = result1.rows[0];
        responseBody.tracks = result2.rows;
    }

    res.send(responseBody);
});


//post a new track in the playlist
app.post('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let body = req.body;
    let track_id = -1;

    let responseBody = body;

    /*
     * add a new track in the database and return the id of the tracks, and if
     * the track already exists still return the id of the track.
     */
    let query1 = {
        text: 'WITH cte AS( \
                INSERT INTO public."Tracks"(name, artist, album) \
                VALUES($1, $2, $3) \
                ON CONFLICT DO NOTHING RETURNING id \
            ) \
            SELECT NULL AS result \
            WHERE EXISTS(SELECT 1 FROM cte) \
            UNION ALL \
            SELECT id \
            FROM public."Tracks" \
                WHERE name = $1 AND artist = $2 AND album = $3 \
            AND NOT EXISTS (SELECT 1 FROM cte);',
        values: [body.name, body.artist, body.album],
    }

    let result = await runQuery(query1);

    track_id = result.rows[0].result;

    //create the link between the playlist an the track
    let query2 = {
        text: 'INSERT INTO public."Playlist_tracks"(playlist_id, track_id) \
            VALUES ($1, $2);',
        values: [playlist_id, track_id],
    }

    try {
        await pgQuery(query2);
    } catch (errCode) {
        switch (errCode) {
            case 23503:
                console.log('23503 - Foreign key conflict');
                res.status(404);
                responseBody = {
                    'error': "Playlist not found"
                };
                break;
            case 23505:
                console.log('23505 - Unique conflict');
                res.status(409);
                responseBody = {
                    'error': "Track already in the playlist"
                };
            default:
                console.log('Error code : ' + errCode);
        }
    }

    res.send(responseBody);
});

app.put('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let newPlaylist = req.body;

    let responseBody = {};

    if (await playlistExist(newPlaylist.name)) {
        res.status(409);
        responseBody.error = "Playlist named : " + newPlaylist.name + " already exist";
    } else {
        let query = {
            text: 'UPDATE public."Playlists" \
    	       SET name= $1, description= $2 \
    	          WHERE id= $3 RETURNING name, description;',
            values: [newPlaylist.name, newPlaylist.description, playlist_id],
        }

        let result = await runQuery(query);

        if (result.rows.length === 0) {
            res.status(404);
            responseBody.error = "Playlist n \°" + playlist_id + " does not found";
        }
    }
    res.send(responseBody);
});

app.delete('/playlist/:playlist_id', async function(req, res) {
    let playlist_id = req.params.playlist_id;
    let responseBody = {};

    // TODO:
    let query = {
        text: 'DELETE FROM public."Playlists" \
            WHERE id= $1; \
        DELETE FROM public."Playlist_tracks" \
            WHERE playlist_id=$1;',
        values: [playlist_id],
    }

    let result = await runQuery(query);

    console.log(result[0].rowCount);
    //check the number of lines deleted in the playlist table
    if (result[0].rowCount === 0) {
        res.status(404);
        responseBody.error = "Playlist n \°" + playlist_id + " does not found";
    } else {
        res.status(200);
    }

    res.send(responseBody);
});

/*
 * /playlist/:playlist_id/:track_id
 */

// IMPORTANT track_id signifie l'emplacement du son dans la playlist

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