// npm installed packages
const {statuses} = require('./httpStatusCodes');

// Local modules/packages
const {Words} = require('./models/wordsModel');
const {mongoose} = require('../db/mongoose');
const ObjectId = require('mongoose').Types.ObjectId;


// ** GET ROUTES **

// route `api/v1/all`
function getAllWords(request, response) {

   let reply;
   // query DB
   Words.find({}, (error, wordDocs) => {
      if (error) {
         throw error
      }
      // Build message to send to client
      reply = {
         "data": [
            {
               "status": statuses(200),
               "words": wordDocs
            }
         ]
      };
      // Send response to client
      response.send(reply);
      // Exclude these properties from displaying
   }).select('-__v -_id');
}

// route `/api/v1/one-word/:word
function getOneWord(request, response) {

   let reply;
   let data = request.params.word;
   // query DB for :word
   Words.findOne({word: data}).exec((error, wordDoc) => {
      if (error) {
         throw error
      }
      if (wordDoc === null) {
         reply = {
            "data": [
               {
                  "status": statuses(200),
                  "msg": "That word is not in the collection, try again."
               }
            ]
         };
         response.send(reply);
      }
      else {
         reply = {
            "data": [
               {
                  "status": statuses(200),
                  "word": wordDoc.word,
                  "score": wordDoc.score
               }
            ]
         };
         response.send(reply);
      }
   });
}


// ** POST ROUTES **

// route `api/v1/add?
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
   // create new instance of `Words` model
   let newWord = new Words({
      word: receivedWord,
      score: receivedScore
   });
   // save the instance to DB
   newWord.save().then((doc) => {
      // send response to client
      response.send(reply);
      next();
      // if an error occurred on save to DB
   }, (error) => {
      response.send(error)
   });
}

// Exports
module.exports = {
   addWord,
   getAllWords,
   getOneWord
};