const jwt = require('jsonwebtoken')
const { reply, tokenError } = require('../helpers/response')
const config = require('../server')
const msgs = require('../helpers/messages')

class Jwtvalidator{

    parseToken(token){
        return jwt.verify(token,config.env.JWT_TOKEN)
    }
    
    async validateToken(req,res,next){
        
        try{
            if( req.headers.authorization && req.headers.authorization != '' ){
    
                let token = req.headers.authorization;
                const user = parseToken(token);
                if( user && user.id ){
                    return replyMsg(req,res,user);
                }else{
                    return clientErrorMsg(req,res,msgs.errorMessages.invalidToken);    
                }
    
            }else{
                return clientErrorMsg(req,res,msgs.errorMessages.tokenRequired);    
            }
        }catch(error){
            return tokenError(req, res, error);
        }
        // let appToken = require('crypto').randomBytes(64).toString('hex')
        // console.log(appToken)
    
    }

    async checkToken (req,res,next){
        try{
            if( req.headers.authorization && req.headers.authorization != '' ){
    
                let token = req.headers.authorization;
                const user = parseToken(token);
                if( user && user.id ){
                    console.log('Redirect to home page')
                    res.redirect('/dashboard')
                }else{
                    next();
                }
    
            }else{
                next();
            }
        }catch(error){
            next();
        }
    }

}

module.exports = new Jwtvalidator();