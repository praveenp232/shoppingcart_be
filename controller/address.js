const Connection = require('../db')

const addAddress = async(req,res) => {
    try{
    const {line1,line2,landmark,pincode,city,state,mobile} = req.body
    let query = `INSERT INTO address line1,line2,landmark,pincode,city,state,mobile,userid,createdBy,updatedBy,deletedBy,deletedAt,createdAt,updatedAt values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW(),NOW())` 
    await Connection.query(query,line1,line2,landmark,pincode,city,state,mobile,req.user.id,req.user.id,req.user.id,req.user.id)
    res.send({status : 'success' , message : 'address added successfully'})
    }
    catch(e){
        res.status(422).send({status:'error' , message : e.message ||e})
    }
}

const updateAddress = async(req,res) => {
    try{
       let query = ''
       if(req.body.line1) query += `line1 = '${req.body.line1}'`
       if(req.body.line2) query += (query != ''? ',':'') + `line2 = '${req.body.line2}'`
       if(req.body.landmark) query += (query != ''? ',':'') + `landmark = '${req.body.landmark}'`
       if(req.body.pincode) query += (query != ''? ',':'') + `pincode = '${req.body.pincode}'`
       if(req.body.city) query += (query != ''? ',':'') + `city = '${req.body.city}'`
       if(req.body.state) query += (query != ''? ',':'') + `state = '${req.body.state}'`
       if(req.body.mobile) query += (query != ''? ',':'') + `mobile = '${req.body.mobile}'`
       let sql = `UPDATE address set ${query} where id = '${req.user.id}'`
       await Connection.query(sql)
       res.send({status: 'success' , message : 'user updated successfully'})
    }
    catch(e){ 
       res.status(422).send({status:'error' , message:e.message||e})
    }
}

const getAddress = async(req,res) => {
    try{
      let {rows} = await Connection.query(`select * from address where id='${req.user.id}'`)
      res.send(rows[0])
    }
    catch(e){
     res.status(422).send({status:'error' , message:e.message||e})
    }
}
const deleteAddress = async(req,res) => {
    try{
        let query = `DELETE FROM address where id = '${req.user.id}'`
        await Connection.query(query)
        res.send({status:'success' , message : "address deleted successfully"})
    }
    catch(e){
      res.status(422).send({status:'error' , message:e.message||e})
    }
}

module.exports = {
    addAddress,
    updateAddress,
    getAddress,
    deleteAddress
}