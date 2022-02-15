const { Console } = require('winston/lib/winston/transports')
const Connection = require('../db')

class productController {
    constructor(id){
        this.userId = id
    }

async addProduct(body,id) {
  try{
     let {name,code,description,firstbox,secondbox,thirdbox,sort,categoryId,metatitle,metadesc,metakeywords,status,addon,createdBy} = body
     const slug = name.replace(/ /g,'_')
     let query = `INSERT INTO product (name,slug,code,description,firstbox,secondbox,thirdbox,sort,categoryId,metatitle,metadesc,metakeywords,status,addon,createdBy,createdAt) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW()) RETURNING *`
     const { rows } =  await Connection.query(query,[name,slug,code,description,firstbox,secondbox,thirdbox,sort,categoryId,metatitle,metadesc,metakeywords,status,addon,this.userId])
      return rows
  }
  catch(error){
      throw error
  }
}

async productList(querypa) {
    try{
    let query = "select * from product where deletedBy is NULL order by createdAt desc"
    if(querypa.OFFSET) query += ` OFFSET ${querypa.OFFSET}`
    if(querypa.LIMIT) query += ` LIMIT ${querypa.LIMIT}`
    let {rows} = await Connection.query(query)    
    await Promise.all(
        await rows.map(async row => {
            let p = (`select * from selectedOptions where productId = ${row.id}`)
            let result = await Connection.query(p)
            console.log("selectedoptions" + result)
            row.selectedOptions = result.rows

            let q = (`select * from product_attributes where productId = ${row.id}`)
            let result1 = await Connection.query(q)
            console.log("productattribute" + result)
            row.product_attributes =result1.rows

            let r = ` select * from user_inputs where productId = ${row.id}`
            let result2 = await Connection.query(r)
            console.log("userinputs" + result2)
            row.user_inputs = result2.rows

            let s = ` select * from images where productId = ${row.id}`
            let result3 = await Connection.query(s)
            console.log("images" + result3)
            row.images = result3.rows
        })
    )
    return (rows)
    }
    catch(error){
        throw error
    }
}

async producInfo(paramsId) {
    try{
    let query = `select * from product where id = '${paramsId}' 
    and deletedAt is NULL order by createdAt desc `
    let {rows} = await Connection.query(query)
    await Promise.all(
        await rows.map(async row => {
            let p = (`select * from selectedOptions where productId = ${row.id}`)
            let result = await Connection.query(p)
            console.log("selectedoptions" + result)
            row.selectedOptions = result.rows

            let q = (`select * from product_attributes where productId = ${row.id}`)
            let result1 = await Connection.query(q)
            console.log("productattribute" + result)
            row.product_attributes =result1.rows

            let r = ` select * from user_inputs where productId = ${row.id}`
            let result2 = await Connection.query(r)
            console.log("userinputs" + result2)
            row.user_inputs = result2.rows

            let s = ` select * from images where productId = ${row.id}`
            let result3 = await Connection.query(s)
            console.log("images" + result3)
            row.images = result3.rows
        })
    )
    return (rows)
    }
    catch(error){
        throw error
    }
}

async updateProduct(body,paramsId,userId) {
    try{
    let query = ''
    if(body.name) query += `name = '${body.name}'`
    if(body.slug) query += (query != '' ? ',':'') + `slug = '${body.slug}'`
    if(body.code) query += (query != '' ? ',':'') + `code = '${body.code}'`
    if(body.description) query += (query != '' ? ',':'') + `description = '${body.description}'`
    if(body.firstbox) query += (query != '' ? ',':'') + `firstbox = '${body.firstbox}'`
    if(body.secondbox) query += (query != '' ? ',':'') + `secondbox = '${body.secondbox}'`
    if(body.thirdbox) query += (query != '' ? ',':'') + `thirdbox = '${body.thirdbox}'`
    if(body.sort) query += (query != '' ? ',':'') + `sort = '${body.sort}'`
    if(body.categoryId) query += (query != '' ? ',':'') + `categoryId = '${body.categoryId}'`
    if(body.metatitle) query += (query != '' ? ',':'') + `metatitle = '${body.metatitle}'`
    if(body.metadesc) query += (query != '' ? ',':'') + `metadesc = '${body.metadesc}'`
    if(body.metaKeywords) query += (query != '' ? ',':'') + `metaKeywords = '${body.metaKeywords}'`
    if(body.status) query += (query != '' ? ',':'') + `status = '${body.status}'`
    if(body.addon) query += (query != '' ? ',':'') + `addon = '${body.addon}'`
    query += (query != '' ? ',':'')
    let sql = `UPDATE product SET ${query} updatedBy = '${userId}' , updatedAt = NOW() where id = '${paramsId}'`
    console.log(sql)
    await Connection.query(sql)
    
    if(body.selectedOptions){
        await Promise.all(
            await body.selectedOptions.map(async opt =>{
            await Connection.query(`INSERT INTO selectedOptions (title,productId) values($1,$2)`, [opt.title,paramsId])
        })
        
        ) 
    }  
    if(body.pvarients){
        await Promise.all(
            await body.pvarients.map(async vari =>{
                await Connection.query('INSERT INTO product_attributes (productId,attributeCombinations,valueCombinations,offerPrice,price) values($1,$2,$3,$4,$5)',[paramsId,vari.combinations,vari.valuecombinations,vari.offerprice,vari.price])
            })
        )
    }
    if(body.userinputs){
        await Promise.all(
            await body.userinputs.map(async ui => {
                await Connection.query(`INSERT INTO user_inputs (productId,type,title,required) values($1,$2,$3,$4)`,[paramsId,ui.type,ui.title,ui.required])
            })
        )
    }
    if(body.image){
        await Promise.all(
            await body.image.map(async img => {
                await Connection.query(`INSERT INTO images (productId,path,thumbnail) values ($1,$2,$3)`,[paramsId,img.path,img.thumbnail])
            })
        )
    }
    return {message:"product updated successfully"}
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