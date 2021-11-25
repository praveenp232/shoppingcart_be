const Jwt = require('jsonwebtoken')
const {secreteKey} = require('../config')
const verify = role => {
    return (req,res,next) => {
        if(!req.headers || !req.headers['authorization']){
            res.status(403).send({status:'error' , message: 'token required'})
        }
        Jwt.verify(req.headers['authorization'],secreteKey,(err,userinfo) => {
            if(err || !userinfo) res.status(403).send({status:'error', message: "token invalid"})
            if( role != '' && userinfo.role !== role) res.status(403).send({status:'error',message: "you dont have permissions to this API"})
            req.user = userinfo

            next();
        })
    }
}

module.exports = {
    verify
}
