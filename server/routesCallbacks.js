// npm installed packages
const {statuses} = require('./httpStatusCodes');

// Local modules/packages
const {Words} = require('./models/wordsModel');
const {mongoose} = require('../db/mongoose');


// POST route `api/v1/add?
function addWord(request, response, next) {
   let data = request.body;
   let receivedWord = data.word;
   let receivedScore = data.score;
   let reply;

   // If score or word params are missing OR score is not a number
   if (!receivedScore || !receivedWord || typeof receivedScore !== 'number') {
      reply = {
         "status": statuses(400)
      };
   }
   // If all params are present
   else {
      reply = {
         "data": [
            {
               "status": statuses(200),
               "word": {
                  "name": receivedWord,
                  "score": receivedScore
               }
            }
         ]
      };
   }
   let newWord = new Words({
      word: receivedWord,
      score: receivedScore
   });

   newWord.save().then((doc) => {
      // Send response to client
      response.send(reply);
      next();
   }, (error) => {
      response.send(error)
   });
}

// GET route `api/v1/all`
function getAllWords(request, response) {
   let reply;
   if (request.method === 'GET') {
      console.log('This was a GET request');
      // query DB
      Words.find({}, (error, data) => {
         if (error) {
            throw error
         }
         // object of all the words
         // Build message to send to client
         reply = {
            "data": [
               {
                  "status": statuses(200),
                  "words": data
               }
            ]
         };
         // Send response to client
         response.send(reply);
         // Exclude these properties from displaying
      }).select('-__v -_id');
   }
   if (request.method === 'POST') {
      console.log('This was a POST request');
      reply = {
         "msg": "HTTP Method not allowed"
      };
      // Send response to client
      response.send(reply)
   }
}

// Exports
module.exports = {
   addWord,
   getAllWords
};