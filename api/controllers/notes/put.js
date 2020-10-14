const Note = require('../../models/note')

exports.update_note = (req, res, next) => {
    const { _id, ...note } = req.body
    Note.updateOne({ _id }, note)
        .exec()
        .then(result => res.sendStatus(204))
        .catch(err => next(err))
}
