const express = require('express')
const app = express()
require('dotenv').config()
let app_name = process.env.APP_NAME
const tokenMid = require('../middlewares/verifyToken')
const homeController = require('../services/backend/HomeController')
const formValidator = require('../middlewares/formValidator')
const jwt = require('../middlewares/verifyToken')

app.get('/dashboard', formValidator.tokenVerify, homeController.dashboard);
app.post('/verifyLogin', formValidator.login, homeController.verifyLogin);
app.post('/forgot', formValidator.forgot, homeController.forgotPassword);
app.post('/changePassword', formValidator.changePassword, homeController.changePassword);

app.get('/validateLogin', jwt.checkJWTToken);


module.exports = app