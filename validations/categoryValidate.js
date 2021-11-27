const Joi = require('joi')
const { errorMessage } = require('./customeMessage')


const addCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       name: Joi.string().required(),
       parentId : Joi.number().required(),
       status: Joi.number().required(),
       desc : Joi.string().required(),
       metadesc : Joi.string().required(),
       metakeywords : Joi.string().required(),
       promoted : Joi.number().required(),
       sort : Joi.number().required(),
       image: Joi.string().required(),
       banner : Joi.string().required(),
       varients: Joi.array().required()
    })

    const{error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const updateCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        slug: Joi.string(),
        parentId : Joi.number(),
        status : Joi.string(),
        varients: Joi.array()
    })

    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const searchCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        search :Joi.string().required()
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}
module.exports = {
    addCategoryValidate,
    updateCategoryValidate,
    searchCategoryValidate
}