/**
 * Created by Kai on 6/18/2017.
 */

const {UploadFile} = require('./models/database_models');

function saveFileUpload(file, email) {
    let newFile = new UploadFile({
        file: file,
        email: email
    });

    newFile.save().then((doc) => {
        console.log('Successful save!!!');
    }, (error) => {
        console.log('ERROR UPLOADING!', error);
    });
}

module.exports = {
    saveFileUpload
};