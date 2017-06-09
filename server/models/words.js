const mongoose = require('mongoose');

// Setup/Schema of the  "Todos" model
let Words = mongoose.model('Word', {
   text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   score: {
      type: Number,
      required: true
   }
});

// export Word model
module.exports = {Words};