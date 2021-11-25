const Connection = require('../db')
const Email = require('../library/email')
const {validateSignup} = require('../library/frontendValidate')
const bcrypt = require('bcrypt')
const{secreteKey} = require('../config')

class userController {
    constructor (id) {
        this.userId = id
    }

    async userInfo(id) {
        try {
            let {rows} = await Connection.query(`select * from users where id ='${id}'`)
            if (rows.length == 0 ) throw new Error("User Not Available")
            return rows[0]
        } catch (error) {
            throw error
        }
    }

    async singup (body) {
        this._validUser(body)
    }

    _validUser( body ){

    }

    

    async delete() {
        try{
            const user = await this.userInfo()
            let query = `DELETE from users where id='${this.userId}'`
            await Connection.query(query)
            return "Success"
        }  catch (error) {
            throw error
        }
    }

}

module.exports = userController