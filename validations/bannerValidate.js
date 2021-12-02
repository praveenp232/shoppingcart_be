const Joi = require('joi')
const { errorMessage } = require('./customeMessage')

const addBannerValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       title : Joi.string().required(),
       url : Joi.string(),
       image : Joi.string().required(),
       sort : Joi.number().required(),
       status : Joi.number()
    })

    const{error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const updateBannerValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       title : Joi.string(),
       url : Joi.string(),
       image : Joi.string(),
       sort : Joi.number(),
       status : Joi.number()
    })

    const{error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

module.exports = {
    addBannerValidate,
    updateBannerValidate
    
}