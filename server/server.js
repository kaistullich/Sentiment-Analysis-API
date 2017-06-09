const express = require('express');

const {addWord} = require("./routesCallbacks");


let app = express();

// All routes
app.get('/add/:word/:score?', addWord);

// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

