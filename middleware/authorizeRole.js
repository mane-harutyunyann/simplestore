const jwt = require('jsonwebtoken')
const {configs} = require('../utils/config')

const authorize = (req,res,next) => {
    const apiKey = req.headers['x-api-key'];
    if(!apiKey || apiKey !== configs.API_KEY){
        return res.status(401).send("Access denied.")
    }
    next();
};

module.exports = { authorize }