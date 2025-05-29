require('dotenv').config()

const configs = {
    'PORT' : process.env.PORT,
    'SECRET_KEY' : process.env.SECRET_KEY,
    'API_KEY' : process.env.API_KEY
}

module.exports = {configs}