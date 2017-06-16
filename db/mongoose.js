const mongoose = require('mongoose');
const config = require('../server/config.json');


// use promises with mongoose, instead of callbacks
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SentimentWords');
// TODO: uncomment when local DB imported into mLab
// mongoose.connect(config.dbUri);

// export mongoose
module.exports = {mongoose};