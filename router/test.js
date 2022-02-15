const routes = require('express').Router()
const {getdata,adddata} = require('../controller/test.js')
// const {addBannerValidate,updateBannerValidate} = require('../validations/bannerValidate')
// const {verify} = require('../validations/auth')

routes.get('/', getdata)
routes.post('/', adddata)
// routes.put('/:id',verify('admin'), updateBannerValidate, updateBanner)
// routes.delete('/:id', verify('admin'), deleteBanner)

module.exports = routes
