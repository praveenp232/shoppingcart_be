const logger = require('./logger')

const successHandler = (statusCode = 200, data, res) => {
    const result = {
        success: true,
        data: data
    }
    res.status(statusCode).send(result)
}

const errorHandler = async (err, res) => {
    logger.error(err)
    const result = {
        success: false,
        message: err.message
    }
    // res.status(statusCode).send(data)
    res.send(result)
}
module.exports = {
    successHandler,
    errorHandler
}