const { Connection } = require("pg")

const validateSignup = async(body) => {
    if(body.password != body.password2) throw new Error ("password and confirmation password does not match")
    else{
        let {rows} = await Connection.query("select * from users where email = $1", [body.email])
        if (rows.length>0) throw new Error ("email id already exists")
        let data = await Connection.query("select * from users where mobileNO= $1", [body.mobileNo])
        if(data.rows.length>0) throw new Error ("mobile number already exists")
    }
}

module.exports = {
    validateSignup
}