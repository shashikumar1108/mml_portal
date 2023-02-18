const jwt = require('jsonwebtoken')

let createToken = (data) => {
    let expirationTime = 60 * 60 * 24 * 3;
    const token = jwt.sign({ data: data }, process.env.JWT_TOKEN, {
        expiresIn: expirationTime,
    });
    return token;
}

let parseToken = (token) => {
    return jwt.verify(token,process.env.JWT_TOKEN)
}

module.exports = { createToken , parseToken}