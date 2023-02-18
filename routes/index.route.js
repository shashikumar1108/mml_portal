const express = require('express')
const app = express()

const loginController = require('../services/frontend/LoginController');



app.get('/',loginController.index);
module.exports = app