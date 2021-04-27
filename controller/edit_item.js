const Item = require('../models/item')


const edit = (req) => {
    const item = body.Item;
    item = new Item({
        title: item.name,
        price: item.price,
        quantity: item.quantity
    })

    return item
}

module.exports = { edit }
