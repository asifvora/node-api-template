const sendResponse = require('./send-response');
const ResponseMessages = require('../constants/response-messages');

const handleCustomThrow = (res, error) => {
  console.log('error', error);
  if (error.code === 400) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 401) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 403) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 404) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 409) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  if (error.code === 422) {
    return sendResponse(res, error.code, {}, error.msg || error.message);
  }
  return sendResponse(res, 500, error, ResponseMessages.genericError);
}

module.exports = handleCustomThrow;
