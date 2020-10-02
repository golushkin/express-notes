const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    children: [{type: mongoose.SchemaTypes.ObjectId, ref: "Note"}],
    links: [Map],
    head: {
        type: Boolean,
        default: false
    }
})

noteSchema.plugin(deepPopulate)

module.exports = mongoose.model("Note", noteSchema)