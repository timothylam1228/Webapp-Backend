const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')


const adminRegister = (body) => {
    // const body = JSON.parse(req.body);
    const saltRounds = 5;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.password, salt);
    console.log(body.username)
    const admin = new Admin({
        username: body.username,
        password: hash
    })
    return admin
}

module.exports = {adminRegister}
