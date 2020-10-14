const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    children: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Note" }],
    links: [Map],
    head: {
        type: Boolean,
        default: false
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        reuqired: true
    }
})

noteSchema.pre('deleteMany', async function(next){
    const children_to_del = this.getFilter()._id['$in']
    const res = await this.model.find({_id: {$in: children_to_del}})
    res.forEach(async el =>{
        if (el.children.length) {
            await this.model.deleteMany({_id: {$in: el.children}})
        }
    })
    next()
})

noteSchema.pre('remove', async function (next) {
    if (this.children.length) {
        await this.model("Note").deleteMany({_id: {$in: this.children}})
    }
    next()
})

module.exports = mongoose.model("Note", noteSchema)