const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('handlebars');

const {addWord, getAllWords, getOneWord} = require("./routesCallbacks");

// init app
let app = express();
// set views path
app.set('views', path.join(__dirname, 'views'));
// set public path
app.use(express.static(path.join(__dirname, 'public')));
// set pug as view engine
app.set('view engine', 'pug');
// use bodyParser for middleware
app.use(bodyParser.json());


// all HTML routes
app.get('/', function (req, res) {
   res.render('index')
});


// all API GET routes
app.get('/api/v1/all', getAllWords);
app.get('/api/v1/one-word/:word', getOneWord);


// all API POST routes
app.post('/api/v1/add?', addWord);

// render 404 for unsuccessful requests
app.get('*', (request, response) => {
   response.render('error_404')
});


// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

