const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmailToAdmin = async ({ subject, html }) => {
    try {
        
    } catch (error) {
        
    }
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Leave Management" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,  // send to admin
    subject,
    html
  };

    transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
            }else{
                // res.status(200).json(info);
                console.log("Email Sent" + info.response);
            }
    })
};

const sendEmailToEmployee = async ({ subject, html, USER_Email }) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Leave Status" <${process.env.ADMIN_EMAIL}>`,
    to: USER_Email,  // send to admin
    subject,
    html
  };

    transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.log(error);
            }else{
                // res.status(200).json(info);
                console.log("Email Sent" + info.response);
            }
    })
};

module.exports = {
  sendEmailToAdmin,
  sendEmailToEmployee
} ;
