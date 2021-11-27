const Connection = require('../db')

class productController {
    constructor(id){
        this.userId = id
    }

async addProduct(body,id) {
  try{
     let {name,slug,code,description,firstBox,secondBox,thirdBox,sort,categoryId,metaTitle,metaDescription,metaKeywords,status,createdBy} = body
     let query = `INSERT INTO product (name,slug,code,description,firstBox,secondBox,thirdBox,sort,categoryId,metaTitle,metaDescription,metaKeywords,status,createdBy,createdAt) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW())`
      await Connection.query(query,[name,slug,code,description,firstBox,secondBox,thirdBox,sort,categoryId,metaTitle,metaDescription,metaKeywords,status,id])
      return "product added successfully"
  }
  catch(error){
      throw error
  }
}

async productList() {
    try{
    let query = "select * from product"
    let {rows} = await Connection.query(query)
    return (rows)
    }
    catch(error){
        throw error
    }
}

async updateProduct(body,id,id1) {
    try{
    let query = ''
    if(body.name) query += `name = '${body.name}'`
    if(body.slug) query += (query != '' ? ',':'') + `slug = '${body.slug}'`
    if(body.code) query += (query != '' ? ',':'') + `code = '${body.code}'`
    if(body.description) query += (query != '' ? ',':'') + `description = '${body.description}'`
    if(body.firstBox) query += (query != '' ? ',':'') + `firstBox = '${body.firstBox}'`
    if(body.secondBox) query += (query != '' ? ',':'') + `secondBox = '${body.secondBox}'`
    if(body.thirdBox) query += (query != '' ? ',':'') + `thirdBox = '${body.thirdBox}'`
    if(body.sort) query += (query != '' ? ',':'') + `sort = '${body.sort}'`
    if(body.categoryId) query += (query != '' ? ',':'') + `categoryId = '${body.categoryId}'`
    if(body.metaTitle) query += (query != '' ? ',':'') + `metaTitle = '${body.metaTitle}'`
    if(body.metaDescription) query += (query != '' ? ',':'') + `metaDescription = '${body.metaDescription}'`
    if(body.metaKeywords) query += (query != '' ? ',':'') + `metaKeywords = '${body.metaKeywords}'`
    if(body.status) query += (query != '' ? ',':'') + `status = '${body.status}'`
    query += (query != '' ? ',':'')
    let sql = `UPDATE product SET ${query} updatedBy = '${id1}' , updatedAt = NOW() where id = '${id}'`
    console.log(sql)
    await Connection.query(sql)
    return "product updated successfully"
    }
    catch(error){
        throw error
    }
}

async searchProduct(body) {
    try{
    let query = `select * from product where name like '${body.search}_%'`
    let {rows} = await Connection.query(query)
    return rows
    }
    catch(error){
        throw error
    }
}

async deleteProduct() {
    try{
    let sql = `UPDATE product SET deletedBy = '${this.userId}', deletedAt = NOW()`
    await Connection.query(sql)
    return "product deleted successfully"
    }
    catch(error){
        throw error
    }
}
}

module.exports = productController