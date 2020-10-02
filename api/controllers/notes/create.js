const express = require('express')
const mongoose = require('mongoose')
const Note = require('../../models/note')


module.exports = create_note = (req, res, next) => {
    const {parent, ...note} = req.body
    const doc = new Note(note)
    if (!parent) {
        doc.save()
        .then(result =>{
            res.status(201).json(doc)
        })
        .catch(err => next(err))
    }
    else{
        doc.save()
        .then(result =>{
            return Note.findOne({_id: parent}).exec()
        })
        .then(result =>{
            result.children.push(doc._id)
            return result.save()
        })
        .then(result =>{
            res.status(201).json(doc)
        })
        .catch(err => next(err))
    }
    
}

/*

module.exports = create_note = (req, res, next) => {
    const { route, parent, ...note } = req.body
    const routeLen = route.length
    const routeExsist = routeLen > 0

    if (routeExsist && routeLen > 1)
        create_deep_note(req, res, next)
    if (routeExsist)
        create_shallow_note(req, res, next)
    else {
        const doc = new Note(note)

        doc.save()
            .then(result => res.status(201).json(result))
            .catch(err => next(err))
    }
}


const create_shallow_note = (req, res, next) => {
    const { route, parent, ...note } = req.body

    if (!parent) {
        const err = new Error("There isn't parent field")
        err.statusCode = 400
        return next(err)
    }
    const doc = new Note(note)
    doc.save()
        .then(result => {
            return  Note.findOne({ _id: parent }).exec()
        })
        .then(result => {
            result.get('children').push(doc)
            return result.save()
        })
        .then(result => res.sendStatus(201))
        .catch(err => next(err))
}

function note_rec(arr, len, note, indexes) {
    const index = indexes[len - 1]

    if (indexes.length === len) {
        console.log(arr.length);
        console.log(arr[index].get('children').length)
        note._id = mongoose.Types.ObjectId()
        arr[index].get('children').push(note)
        console.log(arr.length);
        console.log(arr[index].get('children').length)
    }
    else
        note_rec(arr[index].children, len + 1, note, indexes)

}

const create_deep_note = (req, res, next) => {
    const { route, parent, ...note } = req.body
    const indexes = route.split('-').map(index => Number(index))

    const doc = new Note(note)
    doc.save()
        .then(result => {
            return Note.find({ _id: parent }).exec()
        })
        .then(result => {
            //note_rec(result.children, 2, note, indexes)
            result.get('children')[0].get('children').push(doc)
            return result.save()
        })
        .then(result => res.sendStatus(201))
        .catch(err => next(err))
}



/*


export function create_link(state, action){
    const routeLen = action.payload.route.length

    if (routeLen > 1)
        return create_deep(state, action)

    return create_shallow(state, action)
}


function create_deep(state, action){
    const indexes = action.payload.route.split('-').map(index => Number(index))
    const notes = state.notes

    function note_rec(arr, len){
        const index = indexes[len - 1]

        if(indexes.length === len)
            if(action.type === NOTE.CREATE)
                arr[index].children.push(get_note_obj(action))
            else
                arr[index].links.push(get_link_obj(action))
        else
            note_rec(arr[index].children, len + 1)

    }

    note_rec(notes, 1)
    return {
        ...state,
        notes
    }
}


function create_shallow(state, action){
    const index = Number(action.payload.route)
    const notes = state.notes

    if(action.type === NOTE.CREATE){
        notes[index].children = [
            ...notes[index].children,
            get_note_obj(action)
        ]
    }
    else{
        notes[index].links = [
            ...notes[index].links,
            get_link_obj(action)
        ]
    }

    return {
        ...state,
       notes
    }
}

*/