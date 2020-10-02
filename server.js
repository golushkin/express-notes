const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const allow = require('./middlewares/allow')
const api = require('./api')

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.jor4g.mongodb.net/react-notes?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(allow)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/v1', api)

app.use((req, res, next) =>{
    const err = new Error("There isn't page on this adress: " + req.url)
    err.statusCode = 404
    next(err)
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.statusCode || 500).json({
        msg: "Something bag has happend",
        error: {
            name: err.name,
            message: err.message
        }
    })
})

app.listen(3000, ()=> console.log("Server works on port 3000"))