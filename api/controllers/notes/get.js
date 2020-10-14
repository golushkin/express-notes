const Note = require('../../models/note')

exports.get_all_notes = (req, res) => {
    Note.find({ head: true, author: req.userData._id })
        .populate('children')
        .select('_id title desc children links')
        .exec()
        .then(result => res.json(result))
        .catch(err => next(err))
}

exports.get_children_by_id = (req, res, next) => {
    const _id = req.params.id
    Note.findOne({ _id })
        .populate('children')
        .exec()
        .then(result => res.json(result.children))
        .catch(err => next(err))
}

exports.get_titles = (req, res, next) =>{
    Note.find({author: req.userData._id})
        .select('_id title')
        .exec()
        .then(result => res.json(result))
        .catch(err => next(err))
}