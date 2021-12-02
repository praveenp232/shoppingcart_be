const bodyParser = require('body-parser')
const Connection = require('../db')

class bannerController{
    constructor(id){
        this.userId = id
    }

    async addBanner(body) {
        try{
           let {title,url,image,sort,status} = body
           let query = `INSERT INTO banners (title,url,image,sort,status) values ($1,$2,$3,$4,$5)`
           await Connection.query(query,[title,url,image,sort,status])
           return {message: "banner added successfully"}
        }
        catch(error){
            throw error
        }
    }

    async updateBanner(body,paramsid) {
        try{
           let query = ''
           if(body.title) query += `title ='${body.title}'`
           if(body.url) query += (query != '' ? ',' : '') + `url = '${body.url}'`
           if(body.image) query += (query != '' ? ',' : '') + `image = '${body.image}'`
           if(body.sort) query += (query != '' ? ',' : '') + `sort = '${body.sort}'`
           if(body.status) query += (query != '' ? ',' : '') + `status = '${body.status}'`
           let sql = `UPDATE banners SET ${query} WHERE id = '${paramsid}'`
           console.log(sql)
           await Connection.query(sql)
           return "banner updated successfully"
        }
        catch(error){
            throw error
        }
    }

    async deleteBanner(paramsid) {
        try{
           let query = `DELETE FROM banners where id ='${paramsid}'`
           await Connection.query(query)
           return {message: "banner deleted successfully"}
        }
        catch(error){
            throw error
        }
    }
}

module.exports = bannerController