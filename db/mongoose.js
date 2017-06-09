const mongoose = require('mongoose');

// use promises with mongoose, instead of callbacks
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SentimentWords');

// export mongoose
module.exports = {mongoose};