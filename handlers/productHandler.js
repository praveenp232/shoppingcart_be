const { successHandler, errorHandler } = require('../library/response')
const logger = require('../library/logger')

const addProduct = async(req,res) => {
    try{
        const productController = require('../controller/products')
        const ProductController = new productController(req.user.id)
        const addProduct = await ProductController.addProduct(req.body)
        successHandler(200,addProduct,res)
    }
    catch(e){
      errorHandler(e,res)
    }
}

const productList = async(req,res) => {
    try{
    const productController = require('../controller/products')
    const ProductController = new productController()
    const productList = await ProductController.productList(req.query)
    successHandler(200,productList,res)
    }
    catch(e){
    errorHandler(e,res)
    }
}

const productInfo = async(req,res) => {
    try{
    const productController = require('../controller/products')
    const ProductController = new productController()
    const producInfo = await ProductController.producInfo(req.params.id)
    successHandler(200,producInfo,res)
    }
    catch(e){
    errorHandler(e,res)
    }
}

const updateProduct = async(req,res) => {
    try{
    const productController = require('../controller/products')
    const ProductController = new productController(req.user.id)
    const updateProduct = await ProductController.updateProduct(req.body,req.params.id,req.user.id)
    successHandler(200,updateProduct,res)
    }
    catch(e){
    errorHandler(e,res)
    }
}

const searchProduct = async(req,res) => {
    try{
    const productController = require('../controller/products')
    const ProductController = new productController()
    const searchProduct = await ProductController.searchProduct(req.body)
    successHandler(200,searchProduct,res)
    }
    catch(e){
    errorHandler(e,res)
    }
}

const deleteProduct = async(req,res) => {
    try{
    const productController = require('../controller/products')
    const ProductController = new productController(req.user.id)
    const deleteProduct = await ProductController.deleteProduct()
    successHandler(200,deleteProduct,res)
    }
    catch(e){
    errorHandler(e,res)
    }
}

module.exports = {
    addProduct,
    productList,
    productInfo,
    updateProduct,
    searchProduct,
    deleteProduct
}