const express = require('express')
const app = express()
require('dotenv').config();
let app_name = process.env.APP_NAME
const loginController = require('../services/frontend/LoginController');

// app.get('/',(req,res) => {
// 	res.render('../public/login.html',{app_name})
// })

app.use('/api/v1',require('./backend.route'))
app.use(require('./frontend.route'))

app.get('*', function(req, res){
    res.render('../public/html/404.html')
});

module.exports = app