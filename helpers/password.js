var crypto = require('crypto'); 

class Password{

    async encryptPassword(password){
        // let salt = crypto.randomBytes(16).toString('hex'); 
        // return salt;
        return crypto.pbkdf2Sync(password, process.env.PASS_SALT,  1000, 64, `sha512`).toString(`hex`);    
    }

}

module.exports = new Password();
