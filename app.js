let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/rosters', async function(req, res) {
  const shuffler = require('./services/shuffle_service');
  const mailSender = require('./services/mail_service');
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
      const mailSent = mailSender
        .sendMail(gifterEmail, subject, body)
        .catch(reason => {
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
