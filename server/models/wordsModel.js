const mongoose = require('mongoose');

// words schema
let wordsSchema = mongoose.Schema({
    word: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        versionKey: false,
        unique: true
    },
    score: {
        type: Number,
        required: true,
        versionKey: false
    }
});

let fileUploadSchema = mongoose.Schema({
    file: {
        type: String,
        required: true,
        versionKey: false,
    },
    email: {
        type: String,
        required: true,
    }
});

// model for the `wordsSchema`
let Words = mongoose.model('Word', wordsSchema);
let UploadFile = mongoose.model('UploadedFiles', fileUploadSchema);

// export Word model
module.exports = {
    UploadFile,
    Words,
};