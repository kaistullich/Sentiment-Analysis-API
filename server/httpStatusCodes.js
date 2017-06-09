/**
 * The purpose of this function is to reduce "DRY".
 * The function takes in a HTTP Status Code, and creates
 * the message that will be sent out via response.send()
 *
 * @param {Number} httpStatus
 * @returns {Object} The status message that will be sent
 */
function statuses(httpStatus) {
    // Init the statusMsg object
    let statusMsg;
    // Switch through the passed in HTTP status code
    switch(httpStatus){

        // HTTP 200
        case 200:
            statusMsg = {
                    "request": "success",
                    "response": 200,
            };
            break;

        // HTTP 400
        case 400:
            statusMsg = {
                    "request": "bad",
                    "response": 400,
                    "description": "Bad request"
            };
            break;

        // HTTP 401
        case 401:
            statusMsg = {
                    "request": "bad",
                    "response": 203,
                    "description": "Unauthorized access",
                    "required": "API Key"
            };
            break;

        // HTTP 404
        case 404:
            statusMsg = {
                    "request": "bad",
                    "response": 404,
                    "description": "Not Found",
            };
            break;

        // HTTP 405
        case 405:
            statusMsg = {
                    "request": "bad",
                    "response": 405,
                    "description": "Method Not Allowed - Please check to see the correct HTTP request is being used on this URL ",
            };
            break;

        // HTTP 500
        case 500:
            statusMsg = {
                    "request": "bad",
                    "response": 500,
                    "description": "Internal Server Error - An unexpected error occurred, try again.",
                    "required": "API Key"
            };
            break;
    }

    // Return the object
    return statusMsg;
}

// Exports
module.exports = {
    statuses
};