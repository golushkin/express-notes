const Note = require('../../models/note')

// const arr = [
//     {
//         head: true,
//         title: 'test 0',
//         desc: '',
//         links: [],
//         children: []
//     },
//     {
//         title: 'test 0-0',
//         desc: '',
//         links: [],
//         children: []
//     },
//     {
//         title: 'test 0-0-0',
//         desc: '',
//         links: [],
//         children: []
//     }
// ]

exports.delete_note = (req, res, next) => {
    Note.findOne({_id: req.params.id})
        .exec()
        .then(result => {
            return result.remove()
        })
        .then(result => {
            if (!result.parent) {
                res.sendStatus(204)
            }
            else {  
                delete_note_in_children(req, res, result.parent)
            }
        })
        .catch(err => next(err))
    
    // Note.findByIdAndDelete(req.params.id)
    //     .exec()
    //     .then(result => {
    //         if (!result.parent) {
    //             res.sendStatus(204)
    //         }
    //         else {  
    //             delete_note_in_children(req, res, result.parent)
    //         }
    //     })
    //     .catch(err => next(err))
}


function delete_note_in_children(req, res, parent) {
    Note.findOne({ _id: parent })
        .exec()
        .then(result => {
            result.children.pull(req.params.id)
            return result.save()
        })
        .then(result => res.sendStatus(204))
        .catch(err => next(err))
}