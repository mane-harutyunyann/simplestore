 
const fs = require('fs')
const path = require('path')

const writeData = (filename, request, callback) => {
    readData(filename, (err, data) => {
        if (err) {
            return callback(err);
        }

        let arr = data || [];
        arr.push(request)
        const filePath = path.join(__dirname, '..', filename);
        fs.writeFile(filePath, JSON.stringify(arr, null, 2), (err) => {
            if (err) {
                return callback(err);
            }
        })
    })
}

const readData = (filename, callback) => {
    const filePath = path.join(__dirname,'..', filename);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err);
        }
        if(!data){
            return callback(null, []);
        }
        try {
            const json = JSON.parse(data);
            callback(null, json);
          } catch (parseErr) {
            callback(parseErr);
          }
    })
}

module.exports = { readData, writeData }