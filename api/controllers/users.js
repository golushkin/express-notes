const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const SALT = 10

exports.create_user = (req, res, next) => {
    const { username, pass } = req.body
    bcrypt.hash(pass, SALT)
        .then(hash => {
            return new User({ username, pass: hash }).save()
        })
        .then(result => {
            res.status(201).json({
                token: get_token(result),
                username: result.username
            })
        })
        .catch(err => next(err))
}

exports.log_in = (req, res, next) => {
    const { username, pass } = req.body
    let find_res
    User.findOne({ username })
        .exec()
        .then(result =>{
            if (result) {
                find_res = result
                return bcrypt.compare(pass, result.pass)
            }
            else{
                const err = new Error("There is error in password or username")
                err.statusCode = 400
                next(err)
            }
        })
        .then(result =>{
            if (result) {
                res.json({
                    token: get_token(find_res),
                    username
                })
            }
            else{
                const err = new Error("There is error in password or username")
                err.statusCode = 400
                next(err)
            }
        }) 
        .catch(err => next(err))
}


function get_token(user) {
    const token = jwt.sign({
        _id: user._id,
        username: user.username
    }, process.env.SECRET_KEY, {expiresIn: '1d'})
    return token
}