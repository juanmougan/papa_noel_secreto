import * as dotenv from "dotenv";
import { createTransport } from 'nodemailer'

export async function sendMail(gifterEmail, subject, body) {
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
    let mailOptions = {
      to: gifterEmail,
      subject: subject,
      text: body,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log(`info: ${info}`);    
  }
