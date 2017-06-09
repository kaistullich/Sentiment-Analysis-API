const express = require('express');
let bodyParser = require('body-parser');

const {addWord, getAllWords} = require("./routesCallbacks");

// init app
let app = express();

// parse application/json
app.use(bodyParser.json());

// All routes
app.post('/api/v1/add?', addWord);
app.get('/api/v1/all', getAllWords);

// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

