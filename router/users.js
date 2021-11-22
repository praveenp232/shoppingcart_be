const routes = require('express').Router()
const {signup,signin,updatePassword,forgetPassword,update,userInfo,listofUsers,deleteUser} = require('../controller/users')
const {signupValidate,siginValidate,updatePasswordValidate,forgetPasswordValidate,updateValidate} = require('../validations/userValidations')
const {verify} = require('../validations/auth')

routes.post('/signup',signupValidate,signup)
routes.post('/signin',siginValidate,signin)
routes.put('/updatePassword',updatePasswordValidate,verify(''),updatePassword)
routes.put('/forgetPassword',forgetPasswordValidate,verify(''),forgetPassword)
routes.put('/update',updateValidate,verify(''),update),
routes.get('/userInfo',verify(''),userInfo)
routes.get('/listofUsers',listofUsers)
routes.delete('/deleteUser/:id',verify('admin'),deleteUser)

module.exports = routes