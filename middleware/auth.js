const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys.json').jwtSecret;
const User = require('../models/User');

module.exports = {
    user:  function(req, res, next) {
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
    },
    
    admin : async function(req, res, next) {
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
            const user1 = await User.findById(req.user.id);
            if(!user1) {
                res.status(500).json({msg: 'Authorization denied'});
            }
            if(user1.is_admin) next();
            else{
                res.status(500).json({msg: 'Authorization denied'});
            }
        } catch (err) {
            res.status(401).json({msg: 'Authorization Denied here'});
        }
    }
}
