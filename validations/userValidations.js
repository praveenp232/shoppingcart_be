const Joi = require('joi')
const {errorMessage} = require('./customeMessage')

const signupValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required().min(7),
        password2 :Joi.string().required().min(7),
        mobileNo : Joi.string().required(),
        role : Joi.string().required().allow('user'||'admin'),
        facebookId : Joi.string().required(),
        twitterId : Joi.string().required(),
        googleId : Joi.string().required(),
        captcha: Joi.string()
    })
    const {error} = schema.validate(req.body);
    if(error) errorMessage(res,422,error)
    next();
}

const siginValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       email : Joi.string().required(),
       password : Joi.string().required().min(7)
    })
    const {error} = schema.validate(req.body);
    if(error) errorMessage(res,422,error)
    next();
}

const updatePasswordValidate = (req,res,next) => {
    const schema = Joi.object().keys({
        password : Joi.string().required().min(7),
        newpassword : Joi.string().required().min(7)
    })
    const {error} = schema.validate(req.body);
    if(error) errorMessage(res,422,error)
    next();
}

const forgetPasswordValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       password : Joi.string().required().min(),
       password2 : Joi.string().required().min()
    })

    const {error} = schema.validate(req.body);
    if(error) errorMessage(res,422,error)
    next();
}

const updateValidate = (req,res,next) => {
    const schema = Joi.object().keys({
       name : Joi.string().required(),
       facebookId : Joi.string().required(),
       twitterId : Joi.string().required(),
       googleId : Joi.string(). required()
    })

    const {error} = schema.validate(req.body);
    if(error) errorMessage(res,422,error)
    next();
}

module.exports = {
    signupValidate,
    siginValidate,
    updatePasswordValidate,
    forgetPasswordValidate,
    updateValidate

}


