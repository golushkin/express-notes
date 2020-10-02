const express = require('express')
const notes = require('../controllers/notes')
const router = express.Router()

router.get('/', notes.get_all_notes)
router.post('/', notes.create_note)

router.put('/:id', notes.update_note)

router.delete('/shallow/:id', notes.delete_note)
router.delete('/deep/:id', notes.delete_deep_note)

module.exports = router