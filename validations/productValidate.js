const Joi = require('joi')
const { errorMessage } = require('./customeMessage')

const addProductValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        slug:Joi.string().required(),
        code:Joi.number().required(),
        description:Joi.string().required(),
        firstBox:Joi.number(),
        secondBox:Joi.number(),
        thirdBox:Joi.number(),
        sort:Joi.number().required(),
        categoryId:Joi.number().required(),
        metaTitle:Joi.string().required(),
        metaDescription:Joi.string().required(),
        metaKeywords:Joi.string().required(),
        status:Joi.string().required()
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    next();
}

const updateProductValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        slug:Joi.string(),
        code:Joi.number(),
        description:Joi.string(),
        firstBox:Joi.number(),
        secondBox:Joi.number(),
        thirdBox:Joi.number(),
        sort:Joi.number(),
        categoryId:Joi.number(),
        metaTitle:Joi.string(),
        metaDescription:Joi.string(),
        metaKeywords:Joi.string(),
        status:Joi.string()
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    next();
}
module.exports = {
    addProductValidate,
    updateProductValidate
}