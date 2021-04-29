const Item = require('../models/item')

const add = (body) => {
    const item = new Item({
        title: body.title,
        price: body.price,
        quantity: body.quantity,
        method: body.method
    })
    return item
}

module.exports = { add }
