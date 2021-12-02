const Joi = require('joi')
const { errorMessage } = require('./customeMessage')


const addCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       name: Joi.string().required(),
       parentId : Joi.number().allow(null),
       status: Joi.number(),
       desc : Joi.string(),
       metadesc : Joi.string(),
       metatitle: Joi.string(),
       metakeywords : Joi.string(),
       promoted : Joi.number(),
       sort : Joi.number().required(),
       image: Joi.string().allow(null),
       banner : Joi.string().allow(null),
       varients: Joi.array()
    })

    const{error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const updateCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        slug: Joi.string(),
        parentId : Joi.number().allow(null),
        status : Joi.string(),
        desc : Joi.string(),
        metadesc : Joi.string(),
        metatitle: Joi.string(),
        metakeywords : Joi.string(),
        promoted : Joi.number(),
        sort : Joi.number().required(),
        image: Joi.string().allow(null),
        banner : Joi.string().allow(null),
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