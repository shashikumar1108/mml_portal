
const { reply } = require('../../helpers/response')
class LoginController{

    index(req,res){
        return reply(req,res,{'name':process.env.APP_NAME,'version':process.env.APP_VERSION})
    }

    verifyLogin(req,res){

    }
}
module.exports = new LoginController();

