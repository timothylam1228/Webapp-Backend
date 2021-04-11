const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: 'string'
    },
    price: {
        type: 'Decimal128'
    },
    quantity: {
        type: 'Number'
    }
}, { timestamp: true })

const Item = mongoose.model('Product', itemSchema)
module.exports = Item