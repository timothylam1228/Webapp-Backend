const User = require('../models/user')
const bcrypt = require('bcryptjs')


const register = (body) => {
    // const body = JSON.parse(req.body);
    const saltRounds = 5;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.password, salt);

    const user = new User({
        email: body.email,
        name: body.name,
        password: hash
    })
    return user
}

module.exports = {register}
