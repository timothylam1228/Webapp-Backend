const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    
    username: {
        type: 'string'
    },
    password: {
        type: 'string'
    }
}, { timestamp: true })

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin