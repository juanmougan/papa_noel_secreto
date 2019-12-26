let express = require('express'),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO I need to shuffle the list
app.post('/rosters', function(req, res) {
  console.log('Got this req');
  // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
  console.log(req.body);
  const recepientEmail = req.body[0]; // TODO iterate instead, I'm just getting the first
  const subject = `You are ${recepientEmail}'s Secret Santa!`;
  const body = `Don't forget to get a present for ${recepientEmail}`;
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  console.log(`Will send an email to ${recepientEmail}`);
  console.log(`with subject: ${subject}`);
  console.log(`and body: ${body}`);
  let mailOptions = {
    // to: req.body.to,
    to: recepientEmail,
    subject: subject,
    // subject: req.body.subject,
    text: body
    // text: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(400); // Let's assume all errors are BadRequests
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.send('""');
  res.status(201).end();
});

let server = app.listen(4000, function() {
  let port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
