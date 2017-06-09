const {statuses} = require('./httpStatusCodes');

const {Words} = require('./models/words');
const {mongoose} = require('../db/mongoose');

words = {
   "goofy": 10,
   "hate": 3,
   "unicorn": 5,
   "green": 4
};

// Route `add/:word/:score
function addWord(request, response) {
   let data = request.params;
   let receivedWord = data.word;
   let receivedScore = Number(data.score);
   let reply;

   // If score or word params are missing
   if (!receivedScore) {
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
               "words": words
            }
         ]
      };
   }
   // Send response to client
   response.send(reply);
}

// Exports
module.exports = {
   addWord
};