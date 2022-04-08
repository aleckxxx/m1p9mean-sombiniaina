const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'ekaly.sombiniaina@gmail.com',
        pass: 'M1p9me@n'
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendMail(receiver,subject, text){
    const mailOptions = {
        from: 'ekaly.sombiniaina@gmail.com',
        to: receiver,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("email sent: "+info.response);
        }
    });
}

module.exports = {
    sendMail
};