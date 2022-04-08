var crypto = require('crypto');

const AESCrypt = {};
const cryptkey = crypto.createHash('sha256').update('Nixnogen').digest()
const iv = 'a2xhcgAAAAAAAAAA'

AESCrypt.encrypt = (encryptData) => {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv)
    return Buffer.concat([
        encipher.update(encryptData),
        encipher.final()
    ]).toString('base64')
}

AESCrypt.decrypt = (decryptData) => {
    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv)
    return Buffer.concat([
        decipher.update(decryptData, 'base64'),
        decipher.final()
    ]).toString()
}

module.exports = AESCrypt
