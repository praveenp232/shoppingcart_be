const config = require('./config')
const {Client} = require('pg')
const connection = new Client (config.db)

connection.connect(err =>{
    if(err) throw new Error(err)
    console.log("connection established successfully")
})

module.exports = connection