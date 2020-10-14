const express = require('express')
const users = require('./routes/users')
const notes = require('./routes/notes')

const router = express.Router()

router.use('/notes', notes)
router.use('/users', users)

module.exports = router