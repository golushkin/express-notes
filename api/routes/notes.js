const express = require('express')
const notes = require('../controllers/notes')
const check_auth = require('../../middlewares/check_auth')

const router = express.Router()

router.use(check_auth)
router.get('/', notes.get_all_notes)
router.get('/titles', notes.get_titles)
router.get('/:id', notes.get_children_by_id)

router.post('/', notes.create_note)
router.put('/', notes.update_note)

router.delete('/:id', notes.delete_note)


module.exports = router