const nodemailer = require('nodemailer');

const sendMail = (to, subject, content) => {

    let fromMail = 'shashikumarvchandru@gmail.com';
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,               // true for 465, false for other ports
        secure: false,
        auth: {
            user: fromMail,
            pass: 'shashi@19941996',
        },
        
    });

    const mailData = {
        from: fromMail,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: content,
        html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
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