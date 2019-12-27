let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO check "gifter" and "giftee", there's a bug. Because those names SUCK
function sendMail(gifteeEmail, subject, body) {
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
  console.log(`Will send an email to ${gifteeEmail}`);
  console.log(`with subject: ${subject}`);
  console.log(`and body: ${body}`);
  let mailOptions = {
    to: gifteeEmail,
    subject: subject,
    text: body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // TODO throw an Exception?
      return false;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return true;
  });
}

app.post('/rosters', function(req, res) {
  const shuffler = require('./services/shuffle_service');
  const roster = req.body;
  console.log('Got this req');
  // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
  console.log(roster);
  const gifterGifteeMap = shuffler.shuffleRoster(roster);
  // TODO replace this for a Class, once I migrate this to TypeScript
  for (let gifter of gifterGifteeMap) {
    const gifterEmail = gifter[0];
    console.log(`gifterEmail: ${gifterEmail}`);
    const gifteeEmail = gifter[1];
    console.log(`gifteeEmail: ${gifteeEmail}`);
    const subject = `You are ${gifteeEmail}'s Secret Santa!`;
    const body = `Hi ${gifterEmail}, \nDon't forget to get a present for ${gifteeEmail}`;
    // TODO handle sendMail's errors here
    const mailSent = sendMail(gifteeEmail, subject, body);
    if (!mailSent) {
      return res.status(400); // Let's assume all errors are BadRequests
    }
  }
  res.send('""');
  res.status(201).end();
});

let server = app.listen(4000, function() {
  let port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
