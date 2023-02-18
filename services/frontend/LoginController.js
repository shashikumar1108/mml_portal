
const { reply } = require('../../helpers/response')

class LoginController{

    index(req,res){
        res.render('../public/login.html')
    }

    verifyLogin(req,res){

    }
}
module.exports = new LoginController();

