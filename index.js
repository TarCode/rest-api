const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000

const mongoose = require('mongoose')

Item = require('./list-model')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/list-test')

app.use(bodyParser.urlencoded({ extended: true }))
app.user(bodyParser.json())

const routes = require('./list-routes')
routes(app)

app.listen(port, function() {
    console.log("App listening on port ", port);
})