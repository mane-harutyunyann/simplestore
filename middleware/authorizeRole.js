const jwt = require('jsonwebtoken')

const authorize = (req,res,next) => {
    const role = req.payload.role;
    if(role !== 'admin'){
        return res.status(401).send("Access denied.")
    }
    next();
};

module.exports = { authorize }