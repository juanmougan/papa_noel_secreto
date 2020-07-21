async function sendMail(gifterEmail, subject, body) {
  let nodeMailer = require('nodemailer');
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  console.log(`Will send an email to ${gifterEmail}`);
  console.log(`with subject: ${subject}`);
  console.log(`and body: ${body}`);
  let mailOptions = {
    to: gifterEmail,
    subject: subject,
    text: body
  };
  let info = await transporter.sendMail(mailOptions);
  console.log(`info: ${info}`);
}

module.exports = {
  sendMail
};
