const nodemailer = require('nodemailer');

const sendMail = (to, subject, content) => {

    const mailData = {
        from: fromMail,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: content,
        //html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
    };

    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

const randomCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = { randomCode , sendMail }