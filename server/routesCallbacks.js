const {statuses} = require('./httpStatusCodes');

const {Words} = require('./models/words');
const {mongoose} = require('../db/mongoose');

words = {
   "goofy": 10,
   "hate": 3,
   "unicorn": 5,
   "green": 4
};

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
      text: receivedWord,
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
   // Build message to send to client
   let reply = {
      "data": [
         {
            "status": statuses(200),
            words
         }
      ]
   };
   // Send response to client
   response.send(reply);
}

// Exports
module.exports = {
   addWord,
   getAllWords
};