const mysql = require('mysql')
let conn
try{
    conn = mysql.createConnection({
        // host:'sql.freedb.tech',
        // user:'freedb_mml_root',
        // password:'S$3VNDgv&2h@YJM',
        //database:'freedb_mml_db',

        host:'localhost',
        user:'root',
        password:'',
        database:'portal_db'
    })
    conn.connect(function(error){
        if(error){
            //throw error
            console.log("DB Connection Failed !!!")
        }else{
            console.log('Connected to DB');
        }        
    })
}catch(error){
    console.log("Something went wrong !!!")
}

module.exports = conn