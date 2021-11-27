const routes = require('express').Router()
const {signup, signin, updatePassword, forgetPassword,verifyOTP, update, userInfo, listofUsers, deleteUser,checkMail,uploadImage} = require('../controller/users')
const {signupValidate, siginValidate, updatePasswordValidate, forgetPasswordValidate,verifyOTPValidate, updateValidate,checkMailValidate} = require('../validations/userValidations')
const {verify} = require('../validations/auth')

const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()+'-shopping'+ path.extname(file.originalname)
      cb(null, uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

routes.post('/signup',signupValidate,signup)
routes.post('/signin',siginValidate,signin)
routes.post('/checkmail',checkMailValidate,checkMail)
routes.post('/image',upload.single('files'),uploadImage)
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