const Joi = require('jsonwebtoken')
const errorMessage = require('../validations/customeMessage')

const tokenValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        token : Joi.string().required()
    })

    const {error} = schema.validate(req.body)
    if(err) errorMessage(res,422,error)
    else next();
}

module.exports = {
    tokenValidate
}

