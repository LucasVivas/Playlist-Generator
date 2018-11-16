const express = require('express');
//const ejs = require('ejs');
const morgan = require('morgan'); //to use the log of all the request
const cors = require('cors'); //for cross origin

const rootdir = '/home/node/app/'

const app = express();

app.use(cors());
app.use(morgan('combined'));

app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.sendFile('./index.html', {
    //     root: rootdir
    // });
    res.send('bonsoir toi');
});

app.get('/users', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send('nothing');
});

app.get('/user/:firstname/:lastname', function(req, res) {
    res.send('Bonjour utilisateur ' + req.params.firstname + ' ' + req.params.lastname);
});

app.use(function(req, res, next) {
    res.status(404).send('Page introuvable !');
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Example app listening on port 8080!');
});