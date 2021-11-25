const Joi = require('joi')
const { errorMessage } = require('./customeMessage')


const addCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       name: Joi.string().required(),
       slug: Joi.string().required(),
       parentId : Joi.number().required(),
       status: Joi.string().required()
})

const{error} = schema.validate(req.body)
if(error) errorMessage(res,422,error)
next();
}

const updateCategoryValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name: Joi.string(),
        slug: Joi.string(),
        parentId : Joi.number(),
        status : Joi.string()
    })

    const {error} = schema.validate(req.body)
    if(error) errorMessage(res,422,error)
    next();
}
module.exports = {
    addCategoryValidate,
    updateCategoryValidate
}