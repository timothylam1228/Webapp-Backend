const User = require('../models/user')
const bcrypt = require('bcryptjs')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
        if (err) {
            res.json({ error: err })
        }

        let user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword
        })

        user.save()
            .then(user => {
                res.json({
                    message: 'User Added!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'Error occured!'
                })
            })
    })
}

module.exports = { register }

