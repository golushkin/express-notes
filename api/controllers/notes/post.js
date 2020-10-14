const Note = require('../../models/note')


exports.create_note = (req, res, next) => {
    const { ...note } = req.body
    const doc = new Note({
        ...note,
        author: req.userData._id
    })

    if (!note.parent) {
        doc.save()
            .then(result => {
                res.status(201).json(doc)
            })
            .catch(err => next(err))
    }
    else {
        doc.save()
            .then(result => {
                return Note.findOne({ _id: note.parent }).exec()
            })
            .then(result => {
                result.children.push(doc._id)
                return result.save()
            })
            .then(result => {
                res.status(201).json(doc)
            })
            .catch(err => next(err))
    }

}
