'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: "Please enter an item name"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['todo', 'doing', 'done']
        }],
        default: 'todo'
    }
})

module.exports = mongoose.model('Items', ItemSchema)