let nodemailer = require('nodemailer');
let mymail='choitykashpia@gmail.com'
let mypass='bthtrlfuiovknhpo'
let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mymail,
      pass: mypass
    }
  });
exports.sendmail=async (mail,msg)=>{
    var mailOptions = {
        from: mymail,
        to: mail,
        subject: 'Account Varification',
        text: msg
      };
        
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}