'use strict'

module.exports = function (app) {
    const list = require('./list-controller')

    app.route('/items')
        .get(list.getAllItems)
        .post(list.createItem)

    app.route('/items/:id')
        .get(list.getItem)
        .put(list.updateItem)
        .delete(list.deleteItem)
}