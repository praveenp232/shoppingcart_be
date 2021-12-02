const Joi = require('joi')
const { errorMessage } = require('./customeMessage')

const addProductValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        slug:Joi.string(),
        code:Joi.number().required(),
        description:Joi.string(),
        firstbox:Joi.number(),
        secondbox:Joi.number(),
        thirdbox:Joi.number(),
        sort:Joi.number().required(),
        categoryId:Joi.number(),
        metatitle:Joi.string(),
        metadesc:Joi.string(),
        metakeywords:Joi.string(),
        status:Joi.boolean(),
        addon: Joi.boolean()   
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const updateProductValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        slug:Joi.string(),
        code:Joi.number(),
        description:Joi.string(),
        firstbox:Joi.number(),
        secondbox:Joi.number(),
        thirdbox:Joi.number(),
        sort:Joi.number(),
        categoryId:Joi.number(),
        metatitle:Joi.string(),
        metadesc:Joi.string(),
        metakeywords:Joi.string(),
        status:Joi.boolean(),
        addon :Joi.boolean(),
        selectedOptions:Joi.array(),
        pvarients : Joi.array(),
        userinputs : Joi.array(),
        image : Joi.array()
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}

const searchProductValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        search :Joi.string().required()
    })
    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    else next();
}
module.exports = {
    addProductValidate,
    updateProductValidate,
    searchProductValidate
}