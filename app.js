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
  // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
  // and it should eventually be {"name": "juan", "juan@mail.com"}
  const gifterReceiverMap = shuffler.shuffleRoster(roster);

  try {
    // TODO replace this for a Class, once I migrate this to TypeScript
    for (let pair of gifterReceiverMap) {
      const gifterEmail = pair[0];
      const receiverEmail = pair[1];
      const subject = `You are ${receiverEmail}'s Secret Santa!`;
      const body = `Hi ${gifterEmail}, \nDon't forget to get a present for ${receiverEmail}`;
      const mailSent = sendMail(gifterEmail, subject, body).catch(reason => {
        const errorMessage = `Error sending mail to: ${gifterEmail}. Reason: ${reason}`;
        console.error(errorMessage);
        throw errorMessage;
      });
    }
  } catch (ex) {
    console.error(`Got error: ${ex}`);
    res.status(400).send(ex);
  }
  res.send('""');
  res.status(201).end();
});

let server = app.listen(4000, function() {
  let port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
