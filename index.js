const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan'
)
let config = require('config')

const app = express()

const port = process.env.PORT || 3000

const mongoose = require('mongoose')

Item = require('./item-model')

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    useMongoClient: true
}; 

mongoose.Promise = global.Promise
mongoose.connect(config.DBHost, options)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'))
}

app.get("/", (req, res) => res.json({ message: "Welcome to Items Land!" }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./item-routes')
routes(app)

app.listen(port, function() {
    console.log("App listening on port ", port);
})