// const { Connection } = require('pg')
// const { successHandler, errorHandler } = require('../library/response')
// const logger = require('../library/logger')
// const attributeController = require('../controller/attributes')

// const addAttribute = async (req,res) => {
//     try{
//     const AttributeController = new attributeController()
//     const addAttribute = await AttributeController.addAttribute(req.params.id)
//     successHandler(422,addAttribute,res)
//     }
//     catch(e){
//         errorHandler(e,res)
//     }
// }

// // const updateAttribute = async (req,res) => {
// //     try{
// //     const AttributeController = new attributeController(req.user.id)
// //     const updateAttribute = await AttributeController.updateAttribute(req.body)
// //     successHandler(422,updateAttribute,res)
// //     }
// //     catch(e){
// //         errorHandler(e,res)
// //     }
// // }

// module.exports = {
//     addAttribute
// }