
const { reply } = require('../../helpers/response')
const { createToken , parseToken } = require('../../helpers/jwtToken');

class LoginController{

    index(req,res){
        res.render('../public/login.html')
    }

    // verifyLogin(req,res){
    //     res.send(req.body);
    // }

    dashboard(req,res){
        res.send('Dashboard');
    }
}
module.exports = new LoginController();

