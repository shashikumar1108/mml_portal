const express = require('express')
const app = express()
require('dotenv').config()
let app_name = process.env.APP_NAME
const tokenMid = require('../middlewares/verifyToken')
const loginController = require('../services/frontend/LoginController')
const formValidator = require('../middlewares/formValidator')

app.get('/home', loginController.dashboard);

app.get('/', tokenMid.checkToken, loginController.index);

//app.get('/token',loginController.verifyLogin);

// app.get('/',(req,res) => {
//     res.render('../public/login.html',{app_name})
// })

module.exports = app