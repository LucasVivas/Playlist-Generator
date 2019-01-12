const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.dockerUrl, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

require('./routes/user.routes.js')(app);
require('./routes/user.routes.js')(app);

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send('bonsoir toi');
});

// IMPORTANT track_id signifie l'emplacement du son dans la playlist

app.use((req, res, next) => {
  res.status(404).send('Page introuvable !');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Example app listening on port 8080!');
});
