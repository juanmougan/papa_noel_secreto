let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO check "gifter" and "giftee", there's a bug. Because those names SUCK
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

app.post('/rosters', async function(req, res) {
  const shuffler = require('./services/shuffle_service');
  const roster = req.body;
  console.log('Got this req');
  // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
  console.log(roster);
  const gifterReceiverMap = shuffler.shuffleRoster(roster);
  console.log(`gifterReceiverMap size: ${gifterReceiverMap.size}`);
  // TODO replace this for a Class, once I migrate this to TypeScript
  for (let pair of gifterReceiverMap) {
    const gifterEmail = pair[0];
    console.log(`gifterEmail: ${gifterEmail}`);
    const receiverEmail = pair[1];
    console.log(`receiverEmail: ${receiverEmail}`);
    const subject = `You are ${receiverEmail}'s Secret Santa!`;
    const body = `Hi ${gifterEmail}, \nDon't forget to get a present for ${receiverEmail}`;
    // TODO handle sendMail's errors here
    const mailSent = sendMail(gifterEmail, subject, body).catch(console.error);
    // if (!mailSent) {
    //   console.log(`Error sending mail to: ${gifterEmail}`);
    //   return res.status(400); // Let's assume all errors are BadRequests
    // }
    // console.log(`Mail sent to: ${gifterEmail}`);
  }
  res.send('""');
  res.status(201).end();
});

let server = app.listen(4000, function() {
  let port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
