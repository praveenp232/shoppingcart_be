const { listenerCount } = require('events');
const express = require('express')
const app =  express();
const config = require('./config')
const db = require('./db')
const roots = require('./router')
app.use('/',roots)
const dotenv = require('dotenv');
dotenv.config({path: '.env.'+process.env.NODE_ENV})


app.listen(process.env.PORT,(err => {
    if(err) throw new error (err)
    console.log("currently port is running on:",process.env.PORT)
}))