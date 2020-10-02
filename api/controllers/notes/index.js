const express = require('express')
const create = require('./create')
const Note = require('../../models/note')

exports.get_all_notes = (req, res) => {
    Note.find({head: true})
        .deepPopulate('children.children')
        .select('_id title desc children links')
        .exec()
        .then(result => res.json(result))
        .catch(err => next(err))
}

exports.update_note = (req, res) => {
    Note.find()
        .exec()
        .then(result => res.json(result))
        .catch(err => next(err))
}

exports.delete_note = (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(result => res.sendStatus(204))
        .catch(err => next(err))
}


exports.delete_deep_note = (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(result => res.sendStatus(204))
        .catch(err => next(err))
}

module.exports = {
    ...exports,
    create_note: create
}