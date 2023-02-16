class LoginController{

    index(req,res){
        res.send({'msg':process.env.APP_NAME})
    }

    verifyLogin(req,res){

    }
}
module.exports = new LoginController();

