'use strict';
var crypto = require('crypto');

export const PwSalt = 'b442d703357362b59017c9ea8823f6b8412bad33f1a6d8fec5e41a47689fd524'
export const KeySalt = '7b792df82bc433faa6913e3034d103f00c64360f081c7a88a8c8527652693dff'

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
// var genRandomString = function(length){
//     return crypto.randomBytes(Math.ceil(length/2))
//             .toString('hex') /** convert to hexadecimal format */
//             .slice(0,length)  /** return required number of characters */
// }

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    var value = hash.digest('hex')
    return {
        salt:salt,
        passwordHash:value
    }
}

export function saltHashPassword(userpassword, salt) {
    var passwordData = sha512(userpassword, salt)
    return passwordData.passwordHash
}


export function encrypt(text, keyHash) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(keyHash.slice(0,64), 'hex'), Buffer.from(keyHash.slice(64,96), 'hex'))
 let encrypted = cipher.update(text)
 encrypted = Buffer.concat([encrypted, cipher.final()])
 return encrypted.toString('hex')
}

export function decrypt(text, keyHash) {
 let encryptedText = Buffer.from(text, 'hex')
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyHash.slice(0,64), 'hex'), Buffer.from(keyHash.slice(64,96), 'hex'))
 let decrypted = decipher.update(encryptedText)
 decrypted = Buffer.concat([decrypted, decipher.final()])
 return decrypted.toString()
}
