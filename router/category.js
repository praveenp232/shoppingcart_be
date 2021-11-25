const routes = require('express').Router()
const {addCategory,updateCategory,categoryList,deleteCategory} = require('../handlers/categoryHandler')
const {addCategoryValidate,updateCategoryValidate} = require('../validations/categoryValidate')
const {verify} = require('../validations/auth')

routes.post('/', verify('admin'), addCategoryValidate, addCategory)
routes.put('/:id',verify('admin'),updateCategoryValidate,updateCategory)
routes.get('/',categoryList)
routes.delete('/:id', verify('admin'), deleteCategory)

module.exports = routes
