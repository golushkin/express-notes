const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)