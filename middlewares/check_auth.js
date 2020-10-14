const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            error.statusCode = 400
            next(error)
        } else {
            const err = new Error("You didn't specify auth header or there is error in it")
            err.statusCode = 400
            next(err)
        }

    }
}