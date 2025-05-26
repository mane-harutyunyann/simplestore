require('dotenv').config()

const configs = {
    'PORT' : process.env.PORT,
    'SECRET_KEY' : process.env.SECRET_KEY
}

module.exports = {configs}