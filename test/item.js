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

    describe('/POST item', () => {
        it('it should not post an item without a name', done => {
            let item = {
                createdAt: new Date(),
                status: "todo"
            }

            chai.request(server)
                .post('/items')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.should.have.property('name')
                    res.body.errors.name.should.have.property('kind').eql('required')
                    done()
                })
        })
    })
})