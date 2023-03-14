
const { reply } = require('../../helpers/response')
const { createToken , parseToken } = require('../../helpers/jwtToken');

class LoginController{

    index(req,res){
        res.render('../public/html/login.html')
    }

    forgot(req,res){
        res.render('../public/html/forgot.html')
    }

    resetPassword(req,res){
        let resetCode = req.query.resetCode;
        res.render('../public/html/resetPass.html',{resetCode})
    }

    dashboard(req,res){
        res.render('../public/html/dashboard.html')
    }

    users(req,res){
        res.render('../public/html/users.html')
    }
}
module.exports = new LoginController();

