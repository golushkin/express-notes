const express = require('express')
const user_controller = require('../controllers/users')

const router = express.Router()


router.post('/', user_controller.create_user)
router.post('/login', user_controller.log_in)

module.exports = router