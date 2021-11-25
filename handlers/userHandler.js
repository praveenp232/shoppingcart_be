const { success, errorHandler } = require('../library/response')
const logger = require("../library/logger")

const userInfo = async (req, res) => {
    try{
        
        const userController = require('../controller/userController')
        const UserContoller = new userController()
        const userInfo = await UserController.userInfo(req.params.id)
        success(200, userInfo, res)
    } catch (e) {
        console.log(e)
        errorHandler(e, res)
        // res.status(404).send(e.message)
    }
}

const deleteUser = async (req, res) => {
    try{
        const userController = require('../controller/userController')
        const UserContoller = new userController(req.params.id)
        const userInfo = await UserContoller.delete()
        sucess(200, userInfo, res)
    } catch (e) {
        console.log(e)
        errorHandler(e, res)
    }
}

module.exports = {
    userInfo,
    deleteUser
}