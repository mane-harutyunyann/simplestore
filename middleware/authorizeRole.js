const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

const authorizeRole = (token) => {
    jwt.verify(token,)
}