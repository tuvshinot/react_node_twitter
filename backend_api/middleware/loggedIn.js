require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.headers.auth;

    if(!authHeader) {
        const err = new Error('Not Authenticated.!!! Headers');
        err.statusCode = 401;
        throw err;
    }

    let decodedToken;

    try {
        const token = authHeader.split(' ')[1];
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch(err) {
        err.statusCode = 500;
        err.message = 'from here';
        throw err;
    }

    if(!decodedToken) {
        const err = new Error('Not Authenticated.!!! Token');
        err.statusCode = 401;
        throw err;
    }

    req.userId = decodedToken.id;
    next();
};