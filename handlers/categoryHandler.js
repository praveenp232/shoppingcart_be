const { Connection } = require('pg')
const { successHandler, errorHandler } = require('../library/response')
const logger = require('../library/logger')
const categoryController = require('../controller/category')

const addCategory = async (req, res) => {
    try {
        const CategoryController = new categoryController(req.user.id)
        const addCategory = await CategoryController.addCategory(req.body,req.user.id)
        console.log(addCategory)
        successHandler(200,addCategory,res)
    } catch (e){
        console.log(e)
        errorHandler(e,res)
    }
}

const updateCategory = async (req,res) => {
    try{
       const CategoryController = new categoryController(req.user.id)
       const updateCategory = await CategoryController.updateCategory(req.body,req.params.id,req.user.id)
       successHandler(200,updateCategory,res)
    }
    catch(e){
        errorHandler(e,res)

    }
}

const categoryList = async (req,res) => {
    try {
       const CategoryController = new categoryController()
       const categoryList = await CategoryController.categoryList()
       successHandler(200,categoryList,res)
    }
    catch(e){
        errorHandler(e,res)

    }
}

const categoryInfo = async (req,res) => {
    try {
       const CategoryController = new categoryController()
       const categoryInfo = await CategoryController.categoryInfo(req.params.slug)
       successHandler(200,categoryInfo,res)
    }
    catch(e){
        errorHandler(e,res)

    }
}
const searchCategory = async(req,res) => {
    try{
       const CategoryController = new categoryController()
       const searchCategory = await CategoryController.searchCategory(req.body)
       successHandler(200,searchCategory,res)
    }
    catch(e){
        errorHandler(e,res)
    }
}
const deleteCategory = async(req,res) => {
    try{
       
       const CategoryController = new categoryController(req.user.id)
       const deleteCategory = await CategoryController.deleteCategory(req.params.id)
       successHandler(200,deleteCategory,res)
    }
    catch(e){
        errorHandler(e,res)
    }
}

module.exports = {
    addCategory,
    updateCategory,
    categoryList,
    categoryInfo,
    deleteCategory,
    searchCategory
}