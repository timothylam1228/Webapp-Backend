const Item = require('../models/item')

const add = (req) => {
    const body = JSON.parse(req.body);
    const item = body.Item;
    item = new Item({
        title: item.title,
        price: item.price,
    })
    return item
}

module.exports = { add }
