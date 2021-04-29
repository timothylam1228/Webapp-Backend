const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: {
        type: 'string'
    },
    price: {
        type: 'Decimal128'
    },
    quantity: {
        type: 'Number'
    },
    method: {
        string: 'string'
    }
}, { timestamp: true })

const Item = mongoose.model('Product', itemSchema)
module.exports = Item