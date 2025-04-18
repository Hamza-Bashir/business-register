
const crypto = require('crypto');

module.exports.makeSignature = (signatureNonce, timestamp) => {
    const data = `${signatureNonce}${process.env.GAME_APP_KEY}${timestamp}`;
    return crypto
        .createHash('md5')
        .update(data)
        .digest('hex');
}