const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
});
const mailOptions = {
    from: process.env.EMAIL,
    to: 'recipient@example.com',
    subject: 'Hello from Nodemailer',
    text: 'This is a plain text body!',
    html: '<p>This is an <b>HTML</b> body!</p>',
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  })  
