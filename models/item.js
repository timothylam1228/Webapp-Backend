const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: 'string'
    },
    price: {
        type: 'real'
    },
    quantity: {
        type: 'int'
    }
}, { timestamp: true })

const Item = mongoose.model('User', userSchema)
module.exports = Item