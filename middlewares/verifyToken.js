const jwt = require('jsonwebtoken')
const { replyMsg, tokenError, clientErrorMsg } = require('../helpers/response')
const envConfig = require('../server')
const msgs = require('../helpers/messages')
const { parseToken } = require('../helpers/jwtToken');

class Jwtvalidator{

    parseToken(token){
        return jwt.verify(token,envConfig.env.JWT_TOKEN)
    }
    
    async validateToken(req,res,next){
        
        console.log("user : ",req.headers)

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

        console.log('Token :', req.headers.authorization);
        try{
            if( req.headers.authorization != undefined){
    
                let token = req.headers.authorization;
                const user = parseToken(token);
                console.log("user : ",user)

                if( user && user.data && user.data.id ){
                    //next();
                }else{
                    //res.redirect('/login')    
                }
            }else{
                res.redirect('/login')
            }
        }catch(error){
            res.redirect('/login')
        }
    }

    async createToken(data){
        let expirationTime = 60 * 60 * 24 * 3;
        const token = jwt.sign({ data: data }, envConfig.env.JWT_TOKEN, {
            expiresIn: expirationTime,
        });
        return token;
    }

    //JWT token validation
    async checkJWTToken (req,res,next){

        console.log('Token :', req.headers.authorization);
        try{
            if( req.headers.authorization != undefined){
    
                let token = req.headers.authorization;
                const user = parseToken(token);
                console.log("user : ",user)

                if( user && user.data ){
                    console.log(user.data);
                    if( user.data && user.data.id ){
                        return replyMsg(req,res,user);
                    }else{
                        return clientErrorMsg(req,res,msgs.errorMessages.invalidToken);    
                    }
                }else{
                    return clientErrorMsg(req,res,msgs.errorMessages.invalidToken);
                }
    
            }else{
                return clientErrorMsg(req,res,msgs.errorMessages.invalidToken);
            }
        }catch(error){
            return clientErrorMsg(req,res,msgs.errorMessages.invalidToken);
        }
    }

}

module.exports = new Jwtvalidator();