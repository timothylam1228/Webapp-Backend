const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: 'string'
    },
    name: {
        type: 'string'
    },
    password: {
        type: 'string'
    }
}, { timestamp: true })

const User = mongoose.model('User', userSchema)
module.exports = User