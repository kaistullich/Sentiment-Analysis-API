const express = require('express');
let bodyParser = require('body-parser');

const {addWord, getAllWords, getOneWord} = require("./routesCallbacks");

// init app
let app = express();

// parse application/json
app.use(bodyParser.json());

// all GET routes
app.get('/api/v1/all', getAllWords);
app.get('/api/v1/one-word/:word', getOneWord);

// all POST routes
app.post('/api/v1/add?', addWord);

// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

