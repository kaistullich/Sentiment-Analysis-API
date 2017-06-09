const express = require('express');

const {addWord, getAllWords} = require("./routesCallbacks");


let app = express();

// All routes
app.get('api//add/:word/:score?', addWord);
app.get('/api/all', getAllWords);
// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

