const Joi = require('joi')
const { serverError, clientError, clientErrorMsg } = require('../helpers/response')

class formValidator{

    async login(req,res,next){

        const schema = Joi.object().keys({
            email:Joi.string().required(),
            password:Joi.string().required()
        })

        try{
            const { error } = await schema.validate(req.body);
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

}

module.exports = new formValidator()