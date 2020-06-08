const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys.json').jwtSecret;


module.exports = function(req, res, next) {
    // Get the token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({msg: 'Authorization Denied2'});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Authorization Denied1'});
    }
};