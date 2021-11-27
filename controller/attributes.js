// const Connection = require('../db')

// class attributeController {
//     constructor(id){
//         this.userId = id
//     }

// async addAttribute(id) {
//     try{
//     // let {categoryId,title,value} = body
//     // let query = `INSERT INTO  (categoryId,title,value) values($1,$2,$3)`
//     let query = `delete from attributes where id = '${id}'`
//     await Connection.query(query)
//     return "attribute deleted successfully"
//     }
//     catch(error){
//         throw error
//     }
// }

// // async updateAttribute(body) {
// //     try{
// //     let query = ''
// //     if(body.categoryId) query += `categoryId = '${body.categoryId}'`
// //     if(body.title) query += (query != '' ? ',' : '') + `title = '${body.title}'`
// //     if(body.value) query += (query != '' ? ',' : '') + `value = '${body.value}'`
// //     let sql = `UPDATE attributes SET ${query} where id = '${this.userId}`
// //     await Connection.query(sql)
// //     return "attribute updated successfully"
// //     }
// //     catch(error){
// //         throw error
// //     }
// // }
// }

// module.exports = attributeController