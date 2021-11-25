const routes = require('express').Router()
const {signup, signin, updatePassword, forgetPassword,verifyOTP, update, userInfo, listofUsers, deleteUser} = require('../controller/users')
const {signupValidate, siginValidate, updatePasswordValidate, forgetPasswordValidate,verifyOTPValidate, updateValidate} = require('../validations/userValidations')
const {verify} = require('../validations/auth')
//const userHandler = require("../handlres/userHandler")

routes.post('/signup',signupValidate,signup)
routes.post('/signin',siginValidate,signin)
routes.put('/updatepassword',updatePasswordValidate,verify(''),updatePassword)
routes.put('/forgetpassword',forgetPasswordValidate,forgetPassword)
routes.get('/verifyotp',verifyOTPValidate,verifyOTP)
routes.put('/update',updateValidate,verify(''),update)
routes.get('/userInfo',verify(''),userInfo)
routes.get('/listofusers',listofUsers)
//routes.get('/:id', userHandler.userInfo)
routes.delete('/deleteuser/:id',verify(''),deleteUser)
//routes.delete('/:id', userHandler.deleteUser)

module.exports = routes