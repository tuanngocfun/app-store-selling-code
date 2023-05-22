const crypto = require('crypto')
const connection = require('../connection')

generateToken = (input) => {
    date = new Date()
    input = input + date
    var hash = crypto.createHash('md5').update(input).digest('hex')
    return hash
}

randomString = (len) => {
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var randomString = ''
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
}

module.exports = {
    generateToken,
    randomString,
}
