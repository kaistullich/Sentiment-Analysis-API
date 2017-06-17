const mongoose = require('mongoose');
const config = require('../server/config.json');


// use promises with mongoose, instead of callbacks
mongoose.Promise = global.Promise;

// connect to mLab Collection
mongoose.connect(config.dbUri);

// export mongoose
module.exports = {mongoose};