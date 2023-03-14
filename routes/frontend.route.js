const express = require('express')
const app = express()
require('dotenv').config()
let app_name = process.env.APP_NAME
const tokenMid = require('../middlewares/verifyToken')
const loginController = require('../services/frontend/LoginController')
const formValidator = require('../middlewares/formValidator')

app.get('/users', loginController.users);
app.get('/home', loginController.dashboard);
app.get('/forgot', loginController.forgot);

app.get('/resetPassword', formValidator.resetCodeValidate, loginController.resetPassword);

app.get('/invalid',(req,res) => {
    res.render('../public/html/invalid.html',{app_name})
})

app.get('/', tokenMid.checkToken, loginController.index);

app.get('/login', loginController.index);

//app.get('/token',loginController.verifyLogin);

// app.get('/',(req,res) => {
//     res.render('../public/login.html',{app_name})
// })

module.exports = app