const routes = require('express').Router()
const {verify} = require('../validations/auth')

routes.use('/users',require('./users'))

module.exports = routes