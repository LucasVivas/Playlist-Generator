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
const client = new Client();

client.connect();

client.query('SELECT $1::text as message', ['Connection successful with postgresql!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message);
    client.end();
});


app.use(cors());
app.use(morgan('combined'));

app.get('/', async function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.send('bonsoir toi');
});

/*
 * /playlist
 */

app.post('/playlist', async function(req, res) {

});

/*
 * /playlist/:playlist_id
 */

app.get('/playlist/:playlist_id', async function(req, res) {

});

app.post('/playlist/:playlist_id', async function(req, res) {

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