const Connection = require('../db')
const Email = require('../library/email')
const {validateSignup} = require('../library/frontendValidate')
const bcrypt = require('bcrypt')

const signup = async (req,res) => {
    try{
      let {name,email,password,mobileNo,role,facebookId,twitterId,googleId} = req.body
      await Email.sendMail(email,'registration confirmation','you have registered successfully','please login with registerd details')
      await validateSignup(req.body)
      password = await bcrypt.hashSync(password,2)
      let query = `INSERT INTO users (name,email,password,mobileNo,role,facebookId,twitterId,googleId,createdAt) values ($1,$2,$3,$4,$5,$6,$7,$8,NOW())`
      await Connection.query(query,[name,email,password,mobileNo,role,facebookId,twitterId,googleId])
      res.send({status:'success', message:'user registered successfully'})
    }
    catch(e){
        res.send({status:'error', message:e.message||e})

    }
}