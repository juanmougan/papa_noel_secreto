import * as dotenv from "dotenv";
import { createTransport } from 'nodemailer'
import * as pug from 'pug';

export async function sendMail(gifterEmail, subject, body) {
  return new Promise((resolve,reject) => {  
    dotenv.config();
    let transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log(`Will send an email to ${gifterEmail}`);
    console.log(`with subject: ${subject}`);
    console.log(`and body: ${body}`);
    const compiledFunction = pug.compileFile('../assets/mail_template.pug');
    let mailOptions = {
      to: gifterEmail,
      subject: subject,
      text: compiledFunction({
        gifterEmail: gifterEmail
      }),
    };
    return transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error("error is "+error);
        reject(false);
      } 
      else {
        console.log('Email sent: ' + info.response);
        resolve(true);
      }
    });
  })
}
