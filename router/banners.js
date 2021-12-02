const routes = require('express').Router()
const {addBanner,updateBanner,deleteBanner} = require('../handlers/bannerHandler')
const {addBannerValidate,updateBannerValidate} = require('../validations/bannerValidate')
const {verify} = require('../validations/auth')

routes.post('/', verify('admin'), addBannerValidate, addBanner)
routes.put('/:id',verify('admin'), updateBannerValidate, updateBanner)
routes.delete('/:id', verify('admin'), deleteBanner)

module.exports = routes
