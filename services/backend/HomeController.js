
const { reply, clientError } = require('../../helpers/response')
const { createToken , parseToken } = require('../../helpers/jwtToken');
const commonQuery = require('../../dataAdapters/query/commoQuery')
const msgs = require('../../helpers/messages');
const { randomCode, sendMail } = require('../../helpers/common');

class HomeController{

    async verifyLogin(req,res){

        let where = " email = '"+req.body.email+"' ";
        let data = await commonQuery.getRecords('users',where,'id,email,password,status')
        console.log("Response : ",data);

        if( data && data.length ){
            if( data[0].status != 1 ){
                return clientError(req,res,msgs.errorMessages.inactiveUser)
            }else if( data[0].password != req.body.password ){
                return clientError(req,res,msgs.errorMessages.invalidPassword)
            }else{
                let token = createToken({id:data[0].id});
                let response = {message:msgs.successMessages.loggedSuccess,data:{token:token,email:data[0].email}}
                return reply(req,res,response);    
            }
            console.log("Data : ",data);    
        }else{
            return clientError(req,res,msgs.errorMessages.invalidEmail)
        }      

    }

    async forgotPassword(req,res){

        let where = " email = '"+req.body.userEmail+"' ";
        let data = await commonQuery.getRecords('users',where,'id,email,status')
        //console.log("Response : ",data);

        if( data && data.length ){
            if( data[0].status != 1 ){
                return clientError(req,res,msgs.errorMessages.inactiveUser)
            }else{
                let resetCode = randomCode(50);
                let response = {message:msgs.successMessages.resetSuccess,resetCode:resetCode}
                await sendMail('shashikumarvchandru@yahoo.com','Test Mail','testing');
                return reply(req,res,response);    
            }
            console.log("Data : ",data);    
        }else{
            return clientError(req,res,msgs.errorMessages.invalidEmail)
        }      
        
    }

}
module.exports = new HomeController();

