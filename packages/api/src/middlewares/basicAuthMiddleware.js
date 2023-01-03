// const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            status: 'fail',
            message: 'Missing Authorization Header'
        });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    let user = undefined;
    if (username === 'admin' && password === 'admin') {
        user = {
            "user_id": "admin",
        }
        req.session.user = user;
    }

    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid Authentication Credentials'
        });
    }

    return next();
};