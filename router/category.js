const routes = require('express').Router()
const {addCategory,updateCategory,categoryList,categoryInfo,deleteCategory,searchCategory,uploadImage} = require('../handlers/categoryHandler')
const {addCategoryValidate,updateCategoryValidate,searchCategoryValidate} = require('../validations/categoryValidate')
const {verify} = require('../validations/auth')

routes.post('/', verify('admin'), addCategoryValidate, addCategory)
routes.put('/:id',verify('admin'),updateCategoryValidate,updateCategory)
routes.get('/',categoryList)
routes.get('/info/:slug',categoryInfo)
routes.get('/search',searchCategoryValidate,searchCategory)
routes.delete('/:id', verify('admin'), deleteCategory)

module.exports = routes
