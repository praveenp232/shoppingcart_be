const express = require("express")
const app = express()
const dotenv = require("dotenv")
process.env.NODE_ENV = 'development'
dotenv.config({ path: ".env." + process.env.NODE_ENV })
const roots = require("./router")
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const config = require("./config")
const db = require("./db")
const cors = require('cors')
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use("/api", roots);
app.listen(process.env.PORT, (err) => {
  if (err) throw new error(err);
  console.log("currently port is running on:", process.env.PORT)
});
