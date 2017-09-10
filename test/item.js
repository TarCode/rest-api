'use strict'
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Item = require('../item-model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../')

let should = chai.should()

chai.use(chaiHttp)

describe('Items', () => {
    beforeEach(done => {
        Item.remove({}, err => {
            done()
        })
    })

    describe('/GET item', () => {
        it('it should get all the items', done => {
            chai.request(server)
                .get('/items')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                 done()
                })
        })
    })
})