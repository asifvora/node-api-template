const crypto = require('crypto');

const generateHash = async (payload) => {
  const hash = await crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex');
  return hash;
}

module.exports = generateHash;
