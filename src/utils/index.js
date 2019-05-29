const hashPayload = require('./hash-payload');
const sendResponse = require('./send-response');
const handleCustomError = require('./handle-custom-errors');
const {
  createAccessToken,
  decryptAccessToken,
  createaRefreshToken,
  decryptRefreshToken,
} = require('./encryption');

module.exports = {
  hashPayload,
  sendResponse,
  handleCustomError,
  jwt: {
    createAccessToken,
    decryptAccessToken,
    createaRefreshToken,
    decryptRefreshToken,
  },
};
