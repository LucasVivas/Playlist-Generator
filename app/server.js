const express = require('express');
const http = require('http');

const app = express();

var server = http.createServer();

app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.send('bonjour');
});

// server.on('request', function(req, res) {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Salut tout le monde !');
// });

// server.on('listen', function() {
//     console.log('Server started!');
// })
//
// server.listen(8080);

app.on('listen', function() {
    console.log('Server started!');
})

app.listen(8080);