// Package.json
{
  "name": "newproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "pavani",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.26.1",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.2",
    "express": "^4.17.3",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongo": "^0.1.0",
    "mongoose": "^6.2.4",
    "multer": "^1.4.4",
    "node-schedule": "^2.1.0",
    "nodemailer": "^6.7.2"
  }
}
//mongo.js
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.mongo.uri ,{
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
});

mongoose.connection.on("connected",()=> {
    console.log("MongoDb connection established")
})

mongoose.connection.on("error",(err) => {
    console.log(`MongoDb connection failed ${err}`)
})

mongoose.connection.on("disconnected",()=> {
    console.log("MongoDb connection disconnected")
})
// index.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongo = require('mongo')
const config = require('./config')
const schedule = require("./utility/schedule")
require("./mongo")


app.use(express.json())
app.use('/api',routes)
schedule.reminder();

app.listen(config.PORT,(err)=> {
    if(err) throw new Error
    console.log('project is running on port:', config.PORT)
})
//config.js
module.exports = {
    PORT : 3001,
    secretekey : 'fyewfuywfhijwe',
    mongo : {
        uri : "mongodb+srv://pavani:123456pP@cluster0.a4a7z.mongodb.net/em?retryWrites=true&w=majority",
    }
}
//////// Validations folder
// auth.js
const Jwt = require('jsonwebtoken')
const {secretekey} = require('../config')
const TokenData = require('../models/token')

const verify = role => {
    return (req, res, next) => {
    if(!req.headers || !req.headers['authorization']){
        res.status(403).send({status:'error', message : 'Access token is required'})
        return false
    }

    Jwt.verify(req.headers['authorization'], secretekey, async (err,employeeinfo) => {
        console.log(role)
        if(err || !employeeinfo ) res.status(403).send({status:'error',message: "Access token is invalid"})
        let row = await TokenData.findOne({user_Id : employeeinfo.id, token: req.headers['authorization']})
        if (!row || !row.id) res.status(401).send({status:'error', message: "Your Authorization code is invalid"})
        if (role && employeeinfo.role !== role) res.status(401).send({status:'error',message: "You don't have access to this API"})
        else{
            console.log(employeeinfo)
            req.employee = employeeinfo
            next();
        }
    })
}
}

module.exports = {
    verify
}
// CustomeMessage.js
const errorMessage = (res, status, err) => {
    let mess;
    console.log(err)
    if (err.details) mess = {status: 'error', message: err.details[0].message, path: err.details[0].path}
    else mess = err

    res.status(status).send(mess)
} 

module.exports = {
    errorMessage
}
//EmployeeValidations.js
const Joi = require('joi')
const { errorMessage } = require('./customeMessage')

const signupValidations = (req,res,next) => {
    const schema = Joi.object().keys ({
        title: Joi.string().valid('Mr','Miss','Mrs','Dr').required(),
        firstName: Joi.string().required().min(3).max(15),
        lastName: Joi.string().required().min(3).max(15),
        designation: Joi.string().required(),
        user_Id: Joi.string().alphanum().required(),
        DOB: Joi.date().required(),
        email: Joi.string().email().required(),
        gender:Joi.string().valid('Female','Male').required(),
        salary: Joi.number().required(),
        role: Joi.string().valid('SuperAdmin','SubAdmin','Employee').required(),
        department:Joi.string().valid('Technical','Accounts','HR').required(),
        password:Joi.string()
    })

    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

const signinValidations = (req,res,next) => {
    const schema = Joi.object().keys({
        user_Id: Joi.string().alphanum().required(),
        password:Joi.string().required()
    })

    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

const updatePassValidations = (req,res,next) => {
    console.log(req.body)
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        newPassword : Joi.string().pattern( new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)).required().messages({
            'string.pattern.base': "New Password must have 8 charcters contains (Caps letter, small letter, special charcter & numbers)"
          }),
        confirmPassword: Joi.ref('newPassword')
    })

    const {error} = schema.validate(req.body)
    console.log(error)

    if(error) errorMessage(res, 422, error)
    else next();
    console.log(error)
}

const updateValidations = (req,res,next) => {
    const schema = Joi.object().keys ({
        title: Joi.string().valid('Mr','Miss','Mrs','Dr'),
        firstName: Joi.string().min(3).max(15),
        lastName: Joi.string().min(3).max(15),
        designation: Joi.string(),
        DOB: Joi.date(),
        salary: Joi.number(),
        role: Joi.string().valid('SuperAdmin','SubAdmin','Employee'),
        department:Joi.string().valid('Technical','Accounts','HR')
    })

    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

const getPincodeValidations = (req,res,next) => {
    const schema = Joi.object().keys({
        //pincode : Joi.number().length(5)
        pincode : Joi.string().length(6).pattern(/^[0-9]+$/)
    })
    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

const dataValidations = (req,res,next) => {
    const schema = Joi.object().keys({
        userId : Joi.string().alphanum().required(),
        picture : Joi.string(),
        documents : Joi.array().items(Joi.string()),
        maritalStatus : Joi.string().required(),
        phoneNumber : Joi.string().required(),
        address: {
            houseNo : Joi.string().required(),
            street : Joi.string().required(),
            area : Joi.string().required(),
            landmark : Joi.string().required(),
            village : Joi.string(),
            city : Joi.string().required(),
            state : Joi.string().required(),
            pincode : Joi.string().length(6).pattern(/^[0-9]+$/).required()
        }
    })

    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

const updatedataValidations = (req,res,next) => {
    const schema = Joi.object().keys({
        userId : Joi.string().alphanum(),
        picture : Joi.string(),
        documents : Joi.array().items(Joi.string()),
        maritalStatus : Joi.string(),
        phoneNumber : Joi.string(),
        address: {
            houseNo : Joi.string(),
            street : Joi.string(),
            area : Joi.string(),
            landmark : Joi.string(),
            village : Joi.string(),
            city : Joi.string(),
            state : Joi.string(),
            pincode : Joi.string().length(6).pattern(/^[0-9]+$/)
        }
    })

    const {error} = schema.validate(req.body)

    if(error) errorMessage(res, 422, error)
    else next();
}

module.exports = {
    signupValidations,
    signinValidations,
    updatePassValidations,
    updateValidations,
    getPincodeValidations,
    updatedataValidations,
    dataValidations
}

/////// Utlity folder
//schedule.js
const schedule = require('node-schedule');
const EmployeeData = require("../controller/EmployeeData")
async function reminder(){
    schedule.scheduleJob('0 9 * * *', async () => {
        console.log('ran at ' + new Date());
        console.log("Job Started")
        await EmployeeData.triggerMail()
      })
}

module.exports = {
    reminder
}
//email.js
const nodemailer = require('nodemailer')

const sendMail = async(to, subject, text, htmlcontent) => {
    const transporter = nodemailer.createTransport ({
        port: "465",
        host: "smtp.gmail.com",
        auth: {
            user : 'Fortesting405@gmail.com',
            pass :  'strongpass@123'
        },
        secure: true
    })

    const mailData = {
        from: 'Fortesting405@gmail.com',
        subject,
        to,
        text,
        html: htmlcontent
    };

    transporter.sendMail(mailData,(err,info) => {
        if(err){
            throw new Error(err)
        } 
        else{
            console.log("email sent successfully")
            return "success"
        }
    })
}

module.exports ={
    sendMail
}
///// Routes
//EmpData.js
const routes = require('express').Router()
const multer = require('multer')
const{ getPincodeInfo,Data,uploadFile,updateData,triggerMail} = require('../controller/EmployeeData')
const{getPincodeValidations,dataValidations,updatedataValidations} = require('../validations/EmployeeValidations')
const {verify} = require('../validations/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname) //Appending extension
    }
  })
  
  var upload = multer({ storage: storage });

routes.post('/pincodeinfo',getPincodeValidations, getPincodeInfo)
//routes.post('/data',dataValidations,Data)
routes.post('/file',upload.array('file'),uploadFile)
routes.put('/',updatedataValidations,verify(),updateData)
routes.post('/triggermail', triggerMail)

module.exports = routes
//Employee.js
const routes = require('express').Router()
const{ signup,signin,updatePassword,updateEmployeeDetails, resetPassword,deleteEmployee, employeeList,employeeDetails
,subadminAccess } = require('../controller/Employee')
const{signupValidations,signinValidations,updatePassValidations,updateValidations} = require('../validations/EmployeeValidations')
const {verify} = require('../validations/auth')

routes.post('/', signupValidations, signup)
routes.get('/', verify('SuperAdmin'), employeeList)
routes.post('/signin', signinValidations, signin)
routes.post('/updatepass', updatePassValidations, verify(), updatePassword)
routes.put('/:user_Id', updateValidations, verify('SuperAdmin'), updateEmployeeDetails)
routes.put('/delete/:user_Id',verify('SuperAdmin'),deleteEmployee)
routes.get('/reset/:user_Id', verify('SuperAdmin'), resetPassword)
routes.get('/empdetails',employeeDetails)
routes.put('/saa/:user_Id',verify('SubAdmin'),subadminAccess)


module.exports = routes
//index.js
const routes = require('express').Router()

routes.use('/employee', require('./Employee'))
routes.use('/empdata', require('./EmpData'))

module.exports = routes
///// models
//EmpData.js
const { string } = require('joi')
const mongoose = require('mongoose')

const empdataSchema =  new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required : true}],
    picture : {
        type : String,
        required : false,
        trim : true
    },
    documents : [{
        type : String,
        required : false,
        trim : true
    }],
    maritalStatus : {
        type : String,
        required : false,
        trim : true
    },
    phoneNumber : {
        type : Number,
        required : false,
        trim : true
    },
    address : {
        houseNo : {
            type : String,
            required : false,
            trim : true
        },
        street : {
            type : String,
            required : false,
            trim : true
        },
        area : {
            type : String,
            required : false,
            trim : true
        },
        landmark : {
            type : String,
            required : false,
            trim : true
        },
        village : {
            type : String,
            required : false,
            trim : true
        },
        city : {
            type : String,
            required : false,
            trim : true
        },
        state : {
            type : String,
            required : false,
            trim : true
        },
        pincode : {
            type : Number,
            required : false,
            trim : true
        }
    },
},{
    timestamps : true
})

const Empdata = mongoose.model('Empdata',empdataSchema)

module.exports = Empdata;
//Employee.js
const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    title: {
         type : String,
         required: true,
         trim: true
    },
    firstName: {
        type : String,
        required: true,
        trim: true
    },
    lastName: {
        type : String,
        required: true,
        trim: true
    },
    designation: {
        type : String,
        required: true,
        trim: true
    },
    department: {
        type : String,
        required: true,
        trim: true
    },
    user_Id: {
        type : String,
        required: true,
        trim: true
    },
    DOB:{
       type : Date,
       required: true,
       trim: true   
    },
    age:{
        type : Number,
        required: false,
        trim: true
    },
    email:{
        type : String,
        required: true,
        trim: true
    },
    gender:{
        type : String,
        required: true,
        trim: true
    },
    salary:{
        type : Number,
        required: true,
        trim: true
    },
    role: {
        type : String,
        required: true,
        trim: true
    },
    password:{
        type : String,
        required: true,
        trim: true
    },
    count:{
        type : Number,
        default : 0,
        required : false,
        trim : true
    },
    isPasswordChanged:{
        type : Boolean,
        default : false,
        required : false,
        trim : true, 
    },
    isActive: {
        type : Boolean,
        default : true,
        required : false,
        trim : true
    }
    },{ 
        timestamps: true
})

const Employee = mongoose.model('Employee',employeeSchema)

module.exports = Employee;
//token.js
const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required : true}],
    token: {
         type : String,
         required: true,
         trim: true
    },
    },{ 
        timestamps: true
})

const TokenData = mongoose.model('TokenData',tokenSchema)

module.exports = TokenData;
///// Controller
//Employee.js
const Employee = require ('../models/Employee')
const EmpData = require ('../models/EmpData')
const TokenData = require('../models/token')
const Jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Email = require('../utility/email')
const {secretekey} = require('../config')
const {verify} = require('../validations/auth')

function getAge(DOB) {
  var today = new Date();
  var birthDate = new Date(DOB);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
  }
  return age;
}

const signup = async (req, res) => {
    try{
      let rows = await Employee.find({ $or: [{user_Id: req.body.user_Id}, {email: req.body.email}]})
      if(rows.length > 0) throw new Error ("Employee id / email id alredy exist")
      let password = req.body.password
      if(!req.body.password) password = `Pass-${Math.floor(1000 + Math.random() * 9000)}`
      req.body.password = await bcrypt.hashSync(password, 5)
      req.body.age = getAge(req.body.DOB)
      let template = `<!DOCTYPE html>
      <html>
       <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Login Credentials</title>
       </head>
       <body> 
        <p>Hello, ${req.body.firstName} ${req.body.lastName} </p>
        <br />
        <p>Please find below are credentails for employee management system</p>
        <br />
        <p>User name :-  <b>${req.body.user_Id}</b> </p>
        <p>Password :- <b>${password}</b> </p>
        <br />
        <p>You can use above credentails for login </p>
        <br />
       </body>
      </html>`
      let employee = new Employee(req.body)
      await employee
      .save()
      .then( async data => {
          let empdata = new EmpData({userId: data._id})
          await empdata.save()
          console.log(template)
          await Email.sendMail(req.body.email, 'Registration', '', template)
          res.send("new employee added successfully")
      })
    }
    catch(e){
      res.status(422).send({status:"error", message: e.message||e})
    }
}

const signin = async (req, res) => {
  try{
      let rows = await Employee.findOne({user_Id : req.body.user_Id, isActive: true})
      if(rows.length == 0) throw new Error("UserId is invalid")
      else{
        let match = await bcrypt.compareSync(req.body.password, rows.password)
        if(!match) throw new Error("UserId/password mismatched")
      }
      if (rows.count + 1 > 9 && !rows.isPasswordChanged) throw new Error("Please connect to admin to reset your password") 
      let data = {
        id : rows._id,
        firstName : rows.firstName,
        role : rows.role
      }

      const token = Jwt.sign(data,secretekey)
      await Employee.findOneAndUpdate({ _id: rows._id }, { $inc: { count: 1 } }, {new: true })
      await TokenData.findOneAndRemove({userId :rows._id})
      let tokendata = new TokenData({userId :rows._id, token})
      await tokendata.save()
      let response = {status:'success', token:token, action: ''}
      if (!rows.isPasswordChanged) response.action = "redirect to change password"
      res.send(response)
  }
  catch(e){
     res.status(422).send({status:'error', message:e.message||e})
  }
}

const updatePassword = async (req, res) => {
  try{
    let rows = await Employee.findOne({_id: req.employee.id, isActive: true})
    console.log(rows)
    let match = await bcrypt.compareSync(req.body.password, rows.password)
    if (!match) throw new Error ("old password mismatched")
    req.body.newPassword = await bcrypt.hashSync(req.body.newPassword, 5)
    await Employee.updateOne({_id: req.employee.id},{password: req.body.newPassword,isPasswordChanged: true})
    res.send("password updated successfully")
    
  }
  catch(e){
    res.status(422).send({status:'error', message : e.message||e})
  }
}

const updateEmployeeDetails = async(req, res) => {
  try{
    let emp = await Employee.findOne({user_Id: req.params.user_Id, isActive: true})
    if (!emp) throw new Error("Employee not found")
    if (req.body.DOB) req.body.age = getAge(req.body.DOB)
    await Employee.findOneAndUpdate({user_Id: req.params.user_Id}, req.body)
    res.send("Employee details updated successfully")
  }
  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const resetPassword = async(req, res) => {
  try {
    let emp = await Employee.findOne({user_Id: req.params.user_Id, isActive: true}) // Employee Information
    if (!emp) throw new Error("Employee not found")
    // Reset count 
    const data = { count: 0, isPasswordChanged: false }
    const password = `UpPass-${Math.floor(1000 + Math.random() * 9000)}`
    data.password = await bcrypt.hashSync(password, 5)
    let template = `<!DOCTYPE html>
    <html>
     <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Login Credentials</title>
     </head>
     <body> 
      <p>Hello, ${emp.firstName} ${emp.lastName} </p>
      <br />
      <p>Please find below are credentails for employee management system</p>
      <br />
      <p>User name :-  <b>${emp.user_Id}</b> </p>
      <p>Password :- <b>${password}</b> </p>
      <br />
      <p>You can use above credentails for login </p>
      <br />
     </body>
    </html>`
    
    await Email.sendMail(emp.email, 'Password Reset', '', template)
    await Employee.findOneAndUpdate({user_Id: req.params.user_Id}, data)
    res.send(`Password sent successfull to the ${emp.email} email`)

  }
  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const deleteEmployee = async(req, res) => {
  try {
    let emp = await Employee.findOne({user_Id: req.params.user_Id, isActive : true})
    if (!emp) throw new Error("Employee not found")
    await Employee.findOneAndUpdate({user_Id: req.params.user_Id},{isActive : false})
    res.send('Employee deactivated successfully')
  }
  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const employeeList = async(req, res) => {
  try{
    let query = [
      {
          $lookup : {
              from : "empdatas",
              localField : "_id",
              foreignField : "userId",
              as : "PersonalDetails"
          }
      },
      {$project:{
        '_id' : 0 ,
        'password' : 0,
        '__v' : 0
      }
    },
    {$match :{
         isActive : true,
         ...req.query
    }}
  ]
      rows = await Employee.aggregate(query);
      res.send(rows)
  }
  catch(e){
    res.status(422).send({status:'error', message: e.message||e})
  }
}

const employeeDetails = async(req,res) => {
  try{
      let query = [

          {
              $lookup : {
                  from : "empdatas",
                  localField : "_id",
                  foreignField : "userId",
                  as : "addedby"
              }
          },
          {$project:{
            'title' :1,
            'firstName': 1,
            'lastName' : 1,
            'user_Id' : 1,
            'designation' : 1,
            'department' :1,
            'email' : 1,
            'addedby.phoneNumber' : 1
          }
        }
      ]
          rows = await Employee.aggregate(query);
          res.send(rows)
      
  }
  catch(e){
      res.status(422).send({status:"error", message:e.message||e})
  }
}

  const subadminAccess = async(req,res) => {
    try{
      let emp = await Employee.findOne({user_Id: req.params.user_Id, isActive : false})
      if (!emp) throw new Error("Employee is Active")
      await Employee.findOneAndUpdate({user_Id:req.params.user_Id},{isActive:true})
      res.send("employee moved to active state successfully")
    }
    catch(e){
      res.status(422).send({status:"error", message:e.message||e})
    }
  }
module.exports = {
    signup,
    signin,
    updatePassword,
    updateEmployeeDetails,
    resetPassword,
    deleteEmployee,
    employeeList,
    employeeDetails,
    subadminAccess
}
// EMployeedata.js
const res = require('express/lib/response');
const EmpData = require('../models/EmpData')
const axios = require('axios');
const Employee = require('../models/Employee');
const Token = require('../models/token')
const { employeeDetails } = require('./Employee');
const Email = require('../utility/email')

async function getPincodeInfo(req, res){
    try{
        const response = await axios.get(`https://api.postalpincode.in/pincode/${req.body.pincode}`)
        const info = response.data
        // console.log(inforesponse)
        if (!info[0].PostOffice) throw new Error("Given pincode is invalid")
            let data = {
                Names : info[0].PostOffice.map(p => p.Name),
                Circle: info[0].PostOffice[0].Circle,
                District: info[0].PostOffice[0].District,
                Division: info[0].PostOffice[0].Division,
                Region: info[0].PostOffice[0].Region,
                State: info[0].PostOffice[0].State,
                Country: info[0].PostOffice[0].Country,
                Pincode: info[0].PostOffice[0].Pincode,
            }
        res.send(data)  
    } 
    catch(e){
        console.log("sdfs")
        res.status(422).send({status:'error', message: e.message || e})
    }
  } 
// const Data = async(req,res) => {
//     try{
//         let empdata = new EmpData(req.body)
//         await empdata.save()
//         res.send("Data added successfully")
//     }  
//    catch(e){
//         res.status(422).send({status:"error", message:e.message||e})
//     }
// }

const updateData = async(req,res) => {
    try{
        console.log(req.employee)
        let emp = await Employee.findOne({_id: req.employee.id, isActive: true})
        if (!emp) throw new Error("Employee not found")
        await EmpData.findOneAndUpdate({userId: req.employee.id}, req.body)
        res.send("Employee details updated successfully")
    } 
    catch(e){
        res.status(422).send({status:"error", message:e.message||e})
    }
}

const uploadFile = (req,res) => {
    try{
        console.log(req.files)
        res.send(req.files)
    }
    catch(e){
        res.status(422).send({status:"error", message:e.message||e})
    }
}

const triggerMail = async() => {
    try{
        let emps = await EmpData.find({address:null})
        if( emps.length == 0 ) throw new Error(" Employees not found to send an email")
        await Promise.all(
            emps.map(async e => {
                let emp = await Employee.findById(e.userId)
                if (emp.isActive && emp.email) {
                    let body = `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <title>Remainder mail</title>
                    </head>
                    <body> 
                    <p>Hello, ${emp.firstName} ${emp.lastName} </p>
                    <br />
                    <p>It's a reminder Email, Please login and update your address details</p>
                    <br />
                    </body>
                    </html>`
                    console.log(body)
                    await Email.sendMail(emp.email, 'Remainder Email', '', body)
                }
               
            })
        )
    //    res.send("email regarding updateinfo sent successfully")
    }
    catch(e){
        res.status(422).send({status:"error", message:e.message||e})
    }
}

module.exports = {
    getPincodeInfo,
    updateData,
    uploadFile,
    triggerMail
}
