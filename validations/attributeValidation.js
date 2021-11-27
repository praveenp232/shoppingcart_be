// const Joi = require('joi')
// const { errorMessage} = require ('./customeMessage')

// const addAttributeValidate = (req,res,next) => {
//     const schema = Joi.object().keys({
//         categoryId : Joi.number().required(),
//         title : Joi.string().required(),
//         value : Joi.string().required()
//     })

// const{error} = schema.validate(req.body)
// if(error) errorMessage(res,422,error)
// next();
// }

// const updateAttributeValidate = (req,res,next) => {
//     const schema = Joi.object().keys({
//         categoryId : Joi.number(),
//         title : Joi.string(),
//         value : Joi.string()
//     })

// const{error} = schema.validate(req.body)
// if(error) errorMessage(res,422,error)
// next();
// }
// module.exports = {
// addAttributeValidate,
// updateAttributeValidate

// }