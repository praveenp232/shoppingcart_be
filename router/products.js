const routes = require('express').Router()
const {addProduct,productList,updateProduct,deleteProduct} = require('../handlers/productHandler')
const {addProductValidate,updateProductValidate} = require('../validations/productValidate')
const {verify} = require('../validations/auth')

routes.post('/', verify('admin'), addProductValidate, addProduct)
routes.get('/',productList)
routes.put('/:id', verify('admin'), updateProductValidate, updateProduct)
routes.delete('/:id',verify('admin'),deleteProduct)
// routes.put('/:id',verify('admin'),updateCategoryValidate,updateCategory)
//routes.delete('/:id',deleteProduct)

module.exports = routes
