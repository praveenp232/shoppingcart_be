const Connection = require('../db')
const Email = require('../library/email')
const {validateSignup} = require('../library/frontendValidate')
const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
const{secreteKey} = require('../config')
const Jwt = require('jsonwebtoken')

const checkMail = async (req,res) => {
  try{
    let {rows} = await Connection.query(`select name,email,mobileNo,role,facebookId,twitterId,googleId,createdAt,updatedAt from users where email ='${req.body.email}'`)
    if(rows.length == 0) throw new Error ("user does not exists")
    else{
      res.send(rows[0])
    }
  }
  catch(e){
    res.status(422).send({status:'error' , message:e.message ||e})
  }
}

const signup = async (req,res) => {
    try{
      let {name,email,password,mobileNo,role,facebookId,twitterId,googleId} = req.body
      await Email.sendMail(email,'registration confirmation','you have registered successfully','please login with registered details')
      await validateSignup(req.body)
      
      password = await bcrypt.hashSync(password,2)
      let query = `INSERT INTO users (name,email,password,mobileNo,role,facebookId,twitterId,googleId,createdAt) values ($1,$2,$3,$4,$5,$6,$7,$8,NOW())`
      console.log(Connection)
      await Connection.query(query,[name,email,password,mobileNo,role,facebookId,twitterId,googleId])
      res.send({status:'success', message:'user registered successfully'})
    }
    catch(e){
        res.status(422).send({status:'error', message:e.message||e})

    }
}

const signin = async (req,res) => {
  try{
     let{password,email} = req.body
     let {rows} = await Connection.query(`select * from users where email='${email}'`)
     if(rows.length == 0) throw new Error("email is invalid")
     let match = await bcrypt.compareSync(password,rows[0].password)
     if(!match) throw new Error ("password/email invalid")

     let data = {
       id :  rows[0].id,
       name: rows[0].name,
       role: rows[0].role
     }
     let query = `UPDATE users set updatedAt = NOW() where id ='${rows[0].id}'`
     await Connection.query(query)
     let token = await Jwt.sign(data,secreteKey)
     res.send({status:'success' , user: {token:token , role : rows[0].role , email : rows[0].email}})
  }
  catch(e){
     res.status(422).send({status : 'error' , message : e.message ||e})
  }
}

const updatePassword = async(req,res) => {
  try{
  let{password,newpassword} = req.body
  let {rows} = await Connection.query(`select password from users where id=$1`,[req.user.id])
  let match = await bcrypt.compareSync(password,rows[0].password)
  if(!match) throw new Error("Existing password mismatched")
  await Connection.query(`UPDATE users set password = ${newpassword} where id = $1`,[req.user.id])
  res.send({status:'success' , message:'password updated successfully'})
  }
  catch(e){
   res.status(422).send({status:'error', message:e.message||e})
  }
}

const forgetPassword = async(req,res) => {
  try{
    let {email,password} = req.body
    let{rows} = `select email from users where email = '${req.body.email}'`

    //if(req.body.email != rows[0].email) throw new Error("email does not exists")
    let count = Math.floor(1000 + Math.random() * 9000);
    await Connection.query(`UPDATE users set count=${count} where email='${req.body.email}'`)
    let template = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Forgot Password</title>
    </head>
    <body>
      <h2>Hello! </h2>
      <p>${count} is your OTP to reset the password. </p>
    </body>
    </html>`
    await Email.sendMail(req.body.email,'Reset Password' ,'',template)
    // let query = `UPDATE users set password = $1`
    // await Connection.query(query,password)
    // if(req.body.password != req.body.password2) throw new Error("password and confirmation password does not match")
    // else{
    //   res.send({status:'success', message:"password updated successfully"})
    // }
    res.send("mail send successfully")
  }

  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const verifyOTP = async (req,res) => {
  let {count} = req.body
  let {rows} = `select count from users where email='${req.body.email}'`
  if(req.body.count != rows[0].count) throw new Error ("entered OTP is invalid")
  else{
    res.send({status:'sucess', message:"OTP is valid please set password"})
  }
}

const update = async(req,res) => {
  try{
    let query = ''
    if(req.body.name) query += `name = '${req.body.name}'`
    if(req.body.facebookId) query += (query!=''? ',':'') + ` facebookId = '${req.body.facebookId}'`
    if(req.body.twitterId) query += (query!=''? ',':'') + ` twitterId = '${req.body.twitterId}'`
    if(req.body.googleId) query += (query!=''?',':'') + ` googleId = '${req.body.googleId}'`
    if(req.body.role) query += (query!=''?',':'') + ` role = '${req.body.role}'`
    let sql = `UPDATE users set ${query} where id='${req.user.id}'`
    await Connection.query(sql)
    res.send({status:'success',message:"user updated successfully"})
  }
  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const userInfo = async(req,res) => {
  try{
      let {rows} = await Connection.query(`select name,email,mobileNo,role,facebookId,twitterId,googleId,createdAt,updatedAt from users where id ='${req.user.id}'`)
      res.send(rows[0])
  }
  catch(e){
     res.status(422).send({status:'error',message:e.message||e})
  }
}

const listofUsers = async(req,res) => {
  try{
   let query = "select name,email,mobileNo,role,facebookId,twitterId,googleId,createdAt,updatedAt from users"
   let {rows} = await Connection.query(query)
   res.send(rows)
  }
  catch(e){
    res.status(422).send({status:'error', message:e.message||e})
  }
}

const deleteUser = async(req,res) => {
  try{

    let query = `DELETE from users where id='${req.params.id}'`
    await Connection.query(query)
    res.send("Deleted Successfully")

  }
  catch(e){
    res.status(422).send({status:'error' , message:e.message||e})
  }
}

const uploadImage = async(req,res) => {
  try{
     res.send({path: req.file.path})
  }
  catch(e){
    res.status(422).send({status:'error' , message:e.message||e})
  }
}
module.exports = {
  signup,
  checkMail,
  signin,
  updatePassword,
  forgetPassword,
  verifyOTP,
  update,
  userInfo,
  listofUsers,
  deleteUser,
  uploadImage
}