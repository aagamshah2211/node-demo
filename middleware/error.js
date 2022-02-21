const winston = require('winston')
module.exports = (err, req, res, next) => {
    let error = {...err }
    winston.error(error)
    console.log(error);
    error.message = err.message;
    var message = '',
        statusCode = '';
    if (error.name === 'CastError') {
        message = `Resource not Found`;
        statusCode = 404;
    }
    if (error.name === 'ValidationError') {
        message = Object.values(err.errors).map((val) => val.message);
        statusCode = 400
    }
    if (error.code === 11000) {
        message = `Duplicate field value Entered`;
        statusCode = 400;
    }

    res.status(statusCode || 500).json({
        result: false,
        message: message || err.message
    })
}