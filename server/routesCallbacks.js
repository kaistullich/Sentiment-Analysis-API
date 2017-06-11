// npm install packages
let nodemailer = require('nodemailer');

// Local modules/packages
const {statuses} = require('./httpStatusCodes');
const {Words} = require('./models/wordsModel');
const {mongoose} = require('../db/mongoose');
const config = require('./config');


// ****************
// ** GET ROUTES **
// ****************

// route `api/v1/all`
function getAllWords(request, response) {

   // init reply object
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

   // init reply object
   let reply;
   // grab word from query parameter
   let data = request.params.word;
   // query DB for :word
   Words.findOne({word: data}).exec((error, wordDoc) => {
      if (error) {
         throw error
      }
      // if there was no match with the data sent vs. data in collection
      if (wordDoc === null) {
         reply = {
            "data": [
               {
                  "status": statuses(200),
                  "msg": "That word is not in the collection, try again."
               }
            ]
         };
         // send response to client
         response.send(reply);
      }
      // data sent matches in collection
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
         // send response to client
         response.send(reply);
      }
   });
}


// *****************
// ** POST ROUTES **
// *****************

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

// email callback handler
function handleEmailRequest(request, response, next) {

   // request body
   let requestEmailData = request.body;
   // comment in body
   let comment = requestEmailData.comment;
   // email address in body
   let emailAddress = requestEmailData.emailAddress;

   response.send(request.body);
   next();

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
         user: config.user,
         pass: config.pass
      }
   });

   // text for email body
   let emailBody = `<b>${emailAddress}</b> said: <p>${comment}</p>`;

   // setup email data
   let mailOptions = {
      from: config.from,
      to: config.to,
      subject: '[NEW] Comment / Inquiry Received!',
      html: emailBody
   };

   // send mail with defined transport object
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         return console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
         console.log('Message %s sent: %s', info.messageId, info.response);
      }
   });
}

// Exports
module.exports = {
   addWord,
   getAllWords,
   getOneWord,
   handleEmailRequest
};