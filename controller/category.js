
const Connection = require('../db')

class categoryController {
    constructor(id){
        this.userId = id
    }

 
async addCategory( body, userId) {
    try{
    let {name, parentId, status, desc, metadesc, metakeywords, metatitle, promoted, sort, image, banner, varients } = body
    const slug = name.replace(/ /g,'_')
    let query = `INSERT INTO category (name,slug,parentId,status,description,metaDescription,metaKeywords,metaTitle,promoted,sort,categoryImage,bannerImage,createdBy,createdAt) values ($1, $2, $3, $4, $5,$6,$7,$8,$9,$10,$11,$12,$13, NOW()) RETURNING *`
    let cat = await Connection.query(query, [name,slug, parentId, status, desc, metadesc, metakeywords, metatitle, promoted, sort, image, banner, userId])
    await Promise.all( 
       await varients.map(async attr => {
                await Connection.query(`INSERT INTO attributes (categoryId, title, value) values ($1, $2, $3)`, [cat.rows[0].id, attr.title, attr.value])
                
        }))
        return {message: "category added successfully" }
    }
    catch(error){
        throw error
    }
}

async updateCategory( body, id, userId) {
    try {
        let query = ''
        if(body.name) query += `name = '${body.name}'`
        if(body.slug) query += (query != '' ? ', ' : '') + `slug = '${body.slug}'`
        if(body.parentId) query += (query != '' ? ', ' : '') + `parentId = '${body.parentId}'`
        if(body.status) query += (query != '' ? ', ' : '') + `status = '${body.status}'`
        if(body.image) query += (query != '' ? ', ' : '') + `categoryImage = '${body.image}'`
        if(body.banner) query += (query != '' ? ', ' : '') + `bannerImage = '${body.banner}'`
        if(body.desc) query += (query != '' ? ', ' : '') + `description = '${body.desc}'`
        if(body.metadesc) query += (query != '' ? ', ' : '') + `metaDescription = '${body.metadesc}'`
        if(body.metakeywors) query += (query != '' ? ', ' : '') + `metaKeywors = '${body.metakeywors}'`
        if(body.metatitle) query += (query != '' ? ', ' : '') + `metaTitle = '${body.metatitle}'`
        if(body.promoted) query += (query != '' ? ', ' : '') + `promoted = '${body.promoted}'`
        if(body.sort) query += (query != '' ? ', ' : '') + `sort = '${body.sort}'`
        
        query += (query != '' ? ', ' : '')
        let sql = `UPDATE category SET ${query} updatedBy='${userId}', updatedAt= NOW() where id='${id}'`
        await Connection.query(sql)
        if(body.varients) { 
           await Connection.query(`DELETE from attributes where categoryId =$1`, [id])
           console.log("hello")
           await Promise.all(
            await body.varients.map(async att => {
                await Connection.query(`INSERT INTO attributes (categoryId,title,value) values($1,$2,$3)`, [id,att.title, att.value])
                console.log(att.title + "-updated")
            })
        )}
        return {message: "Updated Sucessfully"}
    }
    catch(error){
         throw error
    }
}

async categoryList() {
    try{
      let query = "select * from category where deletedAt IS NULL order by createdat desc"
       let {rows} = await Connection.query(query)
    await Promise.all(
        await rows.map(async row => {
            let q = `select * from attributes  where categoryId ='${row.id}'`
            let res = await Connection.query(q)
            console.log(res)
            row.attributes = res.rows
            return {row}
        })
    )
        return rows
    }
    catch(error){
        throw error
    }
}

async categoryInfo(id){
    try{
     let query = `select * from category where slug = '${id}'`
     let {rows} = await Connection.query(query)
     console.log(rows)
    await Promise.all(
        await rows.map(async row => {
            let q = `select * from attributes where categoryId = ${row.id}`
            let res = await Connection.query(q)
            row.attribute = res.rows
        })
    )
    return {rows}
    }
    catch(error){
        throw error
    }
}

async searchCategory(body) {
    try{
    let query = `select * from category where name like '${body.search}_%'`
    let {rows} = await Connection.query(query)
    return {rows}
    }
    catch(error){
        throw error
    }
}
async deleteCategory(id) {
    try{
       await Connection.query(`DELETE from attributes where categoryId =${id}`)
       let sql = `UPDATE category set deletedBy = '${this.userId}' , deletedAt = NOW()  where id='${id}'`
       console.log(sql)
        await Connection.query(sql)
        return {message: "category deleted successfully"}
    }
    catch(error){
        throw error
    }
}

}



module.exports = categoryController
