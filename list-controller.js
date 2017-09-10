'use strict'

const mongoose = require('mongoose')
const Item = mongoose.model('Items')

exports.getAllItems = function(req, res) {
    Item.find({}, function(err, item) {
        if (err) res.send(err)
        res.json(item)
    })
}

exports.createItem = function(req, res) {
    const newItem = new Item(req.body)
    newItem.save(function(err, item) {
        if (err) res.send(err)
            res.json(item)
    })
}

exports.getItem = function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (err) res.send(err)
            res.json(item)
    })
}

exports.updateItem = function(req, res) {
    Item.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true }, function(err, item) {
        if (err) res.send(err)
            res.json(item)
    })
}

exports.deleteItem = function(req, res) {
    Item.remove({
        _id: req.params.id
    }, function(err, item) {
        if (err) return res.send(err)
            res.json({ message: 'Item successfully deleted'})
    })
}