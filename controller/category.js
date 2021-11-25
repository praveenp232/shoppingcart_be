
const Connection = require('../db')

class categoryController {
    constructor(id){
        this.userId = id
    }

 
async addCategory( body,id) {
    try{
    let { name, slug, parentId, status } = body
    let query = `INSERT INTO category (name,slug,parentId,status,createdBy,createdAt) values($1,$2,$3,$4,$5, NOW())`
    await Connection.query(query,[name,slug,parentId,status,id])
    return "success"
    }
    catch(error){
        throw error
    }
}

async updateCategory( body,id,id2) {
    try {
        let query = ''
        if(body.name) query += `name = '${body.name}'`
        if(body.slug) query += (query != '' ? ', ' : '') + `slug = '${body.slug}'`
        if(body.parentId) query += (query != '' ? ', ' : '') + `parentId = '${body.parentId}'`
        if(body.status) query += (query != '' ? ', ' : '') + `status = '${body.status}'`
        query += (query != '' ? ', ' : '')
        let sql = `UPDATE category SET ${query}updatedBy='${id2}', updatedAt= NOW() where id='${id}'`
        await Connection.query(sql)
        return "Updated Sucessfully"
    }
    catch(error){
         throw error
    }
}

async categoryList() {
    try{
      let query = "select * from category "
       let {rows} = await Connection.query(query)
      return (rows)
    }
    catch(error){
        throw error
    }
}
async deleteCategory(id) {
    try{
       let sql = `UPDATE category set deletedBy = '${this.userId}' , deletedAt = NOW()  where id='${id}'`
       console.log(sql)
        await Connection.query(sql)
        return "category deleted successfully"
    }
    catch(error){
        throw error
    }
}
}



module.exports = categoryController
