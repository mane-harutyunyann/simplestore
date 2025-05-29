const jwt = require('jsonwebtoken')

const {configs} = require('../utils/config');

const authenticate = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
         return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, configs.SECRET_KEY, (err, data) => {
        if(err){
            console.log(err)
           return res.status(500).send(err.message)
        }

        console.log(data);
        req.payload = data;
        next();
    })
};

module.exports = {authenticate}