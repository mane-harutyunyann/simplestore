const settings = require('./utils/config');
const { validateUserData } = require('./utils/validations');
const { readData, writeData } = require('./utils/fileOperations')
const {createHash } = require('node:crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.use(express.json())

const salt = crypto.randomBytes(16).toString('hex');

app.post('/auth/register', (req, res) => {
    try {
        validateUserData(req.body);
        req.body.role = 'user'
        var users = readData('./data/users.json')
        if (users.some(u => u.username === req.body.username || u.email === req.body.email)){
            return res.status(404).send('Already exists user with specified username or email.')
        }
        req.body.password = crypto.pbkdf2Sync(req.body.password, salt,1000,64, 'sha512').toString('hex')
        req.body.id = users.length++
        writeData('./data/users.json', req.body)
        return res.status(201).send('User is registered successfully.')
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
});

app.post('/auth/login', (req, res) => {
    try {
        validateUserData(req.body);
        var users = readData('./data/users.json');
        var user = users.find(u => u.username === req.body.username)
        if(user < 0){
            return res.status(404).send("Invalid user.")
        }
        if(user.password !== crypto.pbkdf2Sync(req.body.password, salt, 1000, 64,'sha512').toString('hex')){
            return res.status(404).send("Password is incorrect.")
        }
        var token = jwt.sign({ 'username': username, 'password': password }, settings.SECRET_KEY);
        return res.status(201).send(token)
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
})

app.listen(settings.PORT, () => {
    console.log(`Server is  running on port ${settings.PORT}`)
});













