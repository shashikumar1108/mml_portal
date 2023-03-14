const Joi = require('joi')
const { serverError, clientError, clientErrorMsg } = require('../helpers/response')
const { errorMessages } = require('../helpers/messages');

class formValidator{
    
    async tokenVerify(req,res,next){

        const schema = Joi.object().keys({
            authorization:Joi.string().required(),
        }).unknown(true);

        try{
            console.log("Body : ",req.body);
            const { error } = await schema.validate(req.headers);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return clientError(req, res, message);
            }
            return next();
        }catch(error){
            return serverError(req, res, error);
        }
    }

    async login(req,res,next){

        const schema = Joi.object().keys({
            userEmail:Joi.string().required(),
            userPassword:Joi.string().required()
        })

        try{
            console.log("Body : ",req.body);
            const { error } = await schema.validate(req.body);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return clientError(req, res, message);
            }
            //res.send('Success');
            return next();
        }catch(error){
            return serverError(req, res, error);
        }
    }

    async forgot(req,res,next){

        console.log(res.body);
        
        const schema = Joi.object().keys({
            userEmail:Joi.string().required(),
        })

        try{
            const { error } = await schema.validate(req.body);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return clientError(req, res, message);
            }
            //res.send('Success');
            return next();
        }catch(error){
            return serverError(req, res, error);
        }
    }

    async reset(req,res,next){
        
        const schema = Joi.object().keys({
            resetCode:Joi.string().required(),
        })

        try{
            const { error } = await schema.validate(req.query);
            if (error) {
                //let message = "Please Enter Valid Phone Number";
                let message = error && error.details[0].message.replace(/"/g, "'");
                return clientError(req, res, message);
            }
            //res.send('Success');
            return next();
        }catch(error){
            return serverError(req, res, error);
        }
    }

    async resetCodeValidate(req,res,next){
        
        const schema = Joi.object().keys({
            resetCode:Joi.string().required(),
        })

        try{
            const { error } = await schema.validate(req.query);
            if (error) {
                //res.send("Invalid access");
                //res.render('../public/invalid.html')
                res.redirect('/invalid');
            }else{
                return next();
            }            
        }catch(error){
            return serverError(req, res, error);
        }
    }

    async changePassword(req,res,next){
        
        const schema = Joi.object().keys({
            resetCode:Joi.string().required(),
            npassword:Joi.string().min(8).required(),
            cpassword:Joi.string().min(8).required(),
        })

        try{
            const { error } = await schema.validate(req.body);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return clientError(req, res, message);
            }else{

                if( req.body.npassword != req.body.cpassword ){
                    let message = errorMessages.passMismatch;
                    return clientError(req, res, message);
                }else{
                    return next();
                }

            }            
        }catch(error){
            return serverError(req, res, error);
        }
    }

}

module.exports = new formValidator()