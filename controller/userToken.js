const Connection = require('../db')

const tokenAdding = async(req,res) => {
   try{
     let query = 'INSERT INTO users_token userId,token,createdAt values ($1,$2,NOW())'
     await Connection.query(query,req.user.id,req.body.token)
     res.send({status:'sucess' , message : "token added successfully"})
   } 
   catch(e){
      res.status(422).send({status:'error' , message: e.message ||e})
   }
}

module.exports  = {
    tokenAdding
}