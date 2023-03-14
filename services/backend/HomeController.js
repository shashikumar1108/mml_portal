
const { reply, clientError } = require('../../helpers/response')
const { createToken , parseToken } = require('../../helpers/jwtToken');
const commonQuery = require('../../dataAdapters/query/commoQuery')
const msgs = require('../../helpers/messages');
const { randomCode, sendMail } = require('../../helpers/common');
const { errorMessages } = require('../../helpers/messages');
const passwordHelper = require('../../helpers/password');

class HomeController{

    async verifyLogin(req,res){

        let where = " email = '"+req.body.userEmail+"' ";
        let data = await commonQuery.getRecords('users',where,'id,email,password,status')
        console.log("Response : ",data);

        if( data && data.length ){
            if( data[0].status != 1 ){
                return clientError(req,res,msgs.errorMessages.inactiveUser)
            }else{

                let password = await passwordHelper.encryptPassword(req.body.userPassword)
                //console.log('password : ',password)
                if( password != data[0].password ){
                    return clientError(req,res,msgs.errorMessages.invalidPassword)
                }else{
                    let token = createToken({id:data[0].id});
                    let response = {message:msgs.successMessages.loggedSuccess,data:{token:token,email:data[0].email}}
                    return reply(req,res,response); 
                }

            }
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

                let update = 'reset_code = "'+resetCode+'" , reset_password = 1'
                let status = await commonQuery.updateRecord('users','id='+data[0].id,update);

                let content = "<html>";
                content += "<body>";
                content += '<p>Please <a href="http://localhost:3000/resetPassword?resetCode='+resetCode+'" target="_blank">click here</a> to reset the password.</p>';
                content += "</body>";
                content += "</html>";
                
                console.log("content : ",content);
                await sendMail(req.body.userEmail,'Reset Password',content);
                return reply(req,res,response);    
            }
            console.log("Data : ",data);    
        }else{
            return clientError(req,res,msgs.errorMessages.invalidEmail)
        }      
        
    }

    async checkReset(req,res){

        let where = " reset_code = '"+req.query.resetCode+"' and reset_password = 1 ";
        let data = await commonQuery.getRecords('users',where,'id,email,status')
        //console.log("Response : ",data);

        if( data && data.length ){
            if( data[0].status != 1 ){
                return clientError(req,res,msgs.errorMessages.inactiveUser)
            }else{
                res.send(data);
                //res.redirect('/resetPassword');
            }
        }else{
            return clientError(req,res,msgs.errorMessages.invalidEmail)
        }      
        
    }

    async changePassword(req,res){

        //res.send(req.body);
        let where = " reset_code = '"+req.body.resetCode+"' and reset_password = 1 ";
        let data = await commonQuery.getRecords('users',where,'id,email,status')
        //console.log("Response : ",data);
        if( data && data.length ){
            if( data[0].status != 1 ){
                return clientError(req,res,msgs.errorMessages.inactiveUser)
            }else{
                let password = await passwordHelper.encryptPassword(req.body.npassword)
                //console.log("Password salt : ",password);
                let set = " password = '"+password+"',reset_password = 0,reset_code='' ";
                await commonQuery.updateRecord('users',where,set)
                return reply(req,res,{message:errorMessages.passChanged});
            }
        }else{
            return clientError(req,res,msgs.errorMessages.invalidToken)
        }      
        
    }

    async dashboard(req,res){

        return reply(req,res,{sdas:'ada'}); 

    }

}
module.exports = new HomeController();

