const express = require('express')
const router = express.Router()

const { readData, writeData } = require('../utils/fileOperations')
const { authenticate } = require('../middleware/authenticateJWT')
const { authorize } = require('../middleware/authorizeRole')

router.get('/',authenticate, authorize, (req,res) => {
    readData('./data/users.json', (err, users) => {
        if(err){
            return res.status(500).send("Failed to read users data.")
        }
        res.json(users)
    })
});

router.get('/:id', (req,res) => {
    const userId = Number(req.params.id)
    readData('./data/users.json', (err, users) => {
        if(err){
            return res.status(500).send("Failed to read users data.")
        }
        var user = users.find(u => u.id === userId);
        if(!user){
            return res.status(400).send("User not found.")
        }
        return res.status(200).json(user)
    })
});

router.delete('/:id', (req,res) => {
    const userId = Number(req.params.id)

})

router.put('/:id', (req,res) => {
    const userId = Number(req.params.id)
})

module.exports = router