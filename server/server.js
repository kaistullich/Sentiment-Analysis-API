// npm install modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const multer = require('multer');

// local modules
const callbacks = require('./routesCallbacks');

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
app.use(bodyParser.urlencoded({extended: false}));
// form validator
app.use(expressValidator());
// multer
let upload = multer({dest: '../uploaded-files/'});


// all HTML routes
app.get('/', function (request, response) {
    response.render('index', {
        title: 'SA API - Home'
    });
});

app.get('/docs', function (request, response) {
    response.render('docs', {
        title: 'API Docs'
    })
});

// all API GET routes
app.get('/api/v1/one-word/:word', callbacks.getOneWord);
app.get('/api/v1/all', callbacks.getAllWords);

// all API POST routes
app.post('/api/v1/add', callbacks.addWord);

// file upload route
app.get('/upload',  callbacks.upload);
app.post('/file-upload', upload.single('fileUpload'), callbacks.handleFileUpload);

// email process route
app.post('/process_email', callbacks.handleEmailRequest);

// render 404 for unsuccessful requests
app.get('*', (request, response) => {
    response.render('error_404')
});


// Start server
const port = 5000;
app.listen(port, () => {
    console.log('Listening . . . ');
});

