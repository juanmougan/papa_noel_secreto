let express = require('express'),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/rosters', function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  // TODO delete this I think
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

let server = app.listen(4000, function() {
  let port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
