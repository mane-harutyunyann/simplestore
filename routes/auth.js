const {configs} = require('../utils/config');
const { validateUserData } = require('../utils/validations');
const { readData, writeData } = require('../utils/fileOperations')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
    try {
        validateUserData(req.body);
        req.body.role = 'user'
        readData('./data/users.json', (err, users) => {
            if(err){
                return res.status(500).send("Failed to read user data.");
            }
            if (users.some(u => u.username === req.body.username || u.email === req.body.email)){
                return res.status(404).send('Already exists user with specified username or email.')
            }
            req.body.id = users.length++
        })

        bcrypt.hash(req.body.password, 10, (err, encrypted) => {
            if(err){
                return res.status(500).send("Error hashing password");
            }
            req.body.password = encrypted

            writeData('./data/users.json', req.body, (err) => {
                if(err){
                    return res.status(500).send("Failed to save user data.");
                }
            })
            return res.status(201).send('User is registered successfully.')
        })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
});

router.post('/login', (req, res) => {
    try {
        validateUserData(req.body);
        readData('./data/users.json', (err, users) => {
            if (err) {
                console.error(err)
                return res.status(500).send("Failed to read user data.");
            }

            var user = users.find(u => u.username === req.body.username)
            if(!user){
                return res.status(404).send("Invalid user.");
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(500).send("Error checking password");
                
                if (!result) {
                    return res.status(403).send("Password is incorrect");
                }

                var token = jwt.sign(
                    {'id': user.id ,'username': user.username, 'password': user.password, 'role': user.role },
                    configs.SECRET_KEY);
                    
                return res.status(200).send({token})
            });
        });
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
})


module.exports = router













