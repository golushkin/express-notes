const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const allow = require('./middlewares/allow')
const api = require('./api')

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.jor4g.mongodb.net/react-notes?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const app = express()

//app.use(allow)
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/v1', api)

app.use((req, res, next) =>{
    const path_to_file = path.resolve(__dirname, 'static/index.html')
    res.sendFile(path_to_file)
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

app.listen(8000, ()=> console.log("Server works on port 8000"))

module.exports = app