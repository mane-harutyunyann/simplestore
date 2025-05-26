 
const fs = require('fs')
const path = require('path')

const writeData = (filename, data) => {
    const filePath = path.join(__dirname, filename);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            throw err;
        }
    })
}

const readData = (filename) => {
    const filePath = path.join(__dirname, filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        return JSON.parse(data)
    })
}

module.exports = { readData, writeData }