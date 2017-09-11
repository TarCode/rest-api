'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

const port = process.env.PORT || 3000
let dbName = process.env.NODE_ENV === 'test' ? '/list-test' : '/list-dev'

let mongoUrl = 'mongodb://' + process.env.MONGO_HOST || 'mongodb://localhost:27017'
    mongoUrl = mongoUrl + dbName

if (process.env.NODE_ENV === 'test') {
    mongoUrl = "mongodb://test:test@ds133004.mlab.com:33004/list-test"
}

const mongoose = require('mongoose')
const routes = require('./item-routes')

const Item = require('./item-model')

const options = {
    useMongoClient: true
}; 

mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, options)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
}
routes(app)

app.get("/", (req, res) => res.json({ message: "Welcome to Items Land!" }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, function() {
    console.log("App listening on port ", port);
})

module.exports = app