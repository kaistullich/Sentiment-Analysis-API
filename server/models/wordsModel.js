const mongoose = require('mongoose');

// words schema
let wordsSchema = mongoose.Schema({
   word: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      versionKey: false
   },
   score: {
      type: Number,
      required: true,
      versionKey: false
   }
});

// model for the `wordsSchema`
let Words = mongoose.model('Word', wordsSchema);

// export Word model
module.exports = {Words};