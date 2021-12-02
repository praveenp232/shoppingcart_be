const { Connection } = require('pg')
const { successHandler, errorHandler } = require('../library/response')
const logger = require('../library/logger')
const bannerController = require('../controller/banners')

const addBanner = async(req,res) => {
    try{
        const BannerController = new bannerController()
        const addBanner = await BannerController.addBanner(req.body)
        successHandler(200,addBanner,res)
    }
    catch(e){
        errorHandler(e,res)
    }
}

const updateBanner = async(req,res) => {
    try{
        const BannerController = new bannerController()
        const updateBanner = await BannerController.updateBanner(req.body,req.params.id)
        successHandler(200,updateBanner,res)
    }
    catch(e){
        errorHandler(e,res)
    }
}

const deleteBanner = async(req,res) => {
    try{
        const BannerController = new bannerController()
        const deleteBanner = await BannerController.deleteBanner(req.params.id)
        successHandler(200,deleteBanner,res)
    }
    catch(e){
        errorHandler(e,res)
    }
}

module.exports = {
    addBanner,
    updateBanner,
    deleteBanner
}