const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/test';

const mongo = () => {
    const url = process.env.MONGO_URL || 'mongodb://localhost/list-test'
    return MongoClient.connect(url, (err, database) => {
        if (err) return console.log('error while connecting to ' + url, err);
        return database
    })
}

const items = db => db.collection('items')


app.get('/', function (req, res) {
    mongo()
    .then(db => {
        res.send(items.find())  
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})