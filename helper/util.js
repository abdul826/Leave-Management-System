const jwt = require('jsonwebtoken');

const generateToken = (userId)=>{
    return jwt.sign({_id:userId}, process.env.JWT_SECRET_KEY, {expiresIn:"30m"});
}

module.exports = generateToken;