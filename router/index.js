const routes = require('express').Router()

routes.use('/users', require('./users'))
routes.use('/userToken', require('./userToken'))
routes.use('/category', require('./category'))
routes.use('/products',require('./products'))
routes.use('/banners', require('./banners'))
routes.use('/test', require('./test'))

module.exports = routes