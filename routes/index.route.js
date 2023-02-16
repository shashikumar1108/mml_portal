const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    console.log("MML Portal")
})

module.exports = app