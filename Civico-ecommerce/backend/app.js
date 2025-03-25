const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./config/Db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()
ConnectDB()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/',require('./routes/indexRoutes'))
module.exports = app