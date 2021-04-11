const Item = require('../models/item')


const add = (req) => {
    const body = JSON.parse(req.body);
    const item = body.Item;
    item = new Item({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    })

    return item
}

module.exports = { add }
