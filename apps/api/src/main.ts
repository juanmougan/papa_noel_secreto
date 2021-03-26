import * as express from 'express';
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { shuffleRoster } from './services/shuffle_service'
import { sendMail } from './services/mail_service'


const app = express();
app.use(cors());

app.use(express.static('../../../dist/apps/ui'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO move this to the Router instead
app.post('/api/rosters', function (req, res) {
  const roster = req.body;
  // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
  // and it should eventually be {"name": "juan", "juan@mail.com"}
  const gifterReceiverMap = shuffleRoster(roster);
  sendMails(gifterReceiverMap)
    .then(data => {
      const { sent, errors } = data
      console.log("Errors", errors);
      console.log("Sent", sent);
      if (errors && errors.length) {
        res.status(400).send({
          sent: sent,
          errors: errors
        });
      } else {
        res.status(201).send({
          sent: sent
        })
      }
    });
});

async function sendMails(gifterReceiverMap) {
  const sent: string[] = []
  const errors: string[] = []

  for (let pair of gifterReceiverMap) {
    const gifterEmail = pair[0];
    const receiverEmail = pair[1];
    const subject = `You are ${receiverEmail}'s Secret Santa!`;
    const body = `Hi ${gifterEmail}, \nDon't forget to get a present for ${receiverEmail}`;

    try {
      await sendMail(gifterEmail, subject, body)
      sent.push(gifterEmail)
    } catch (error) {
      const errorMessage = `Error sending mail to: ${gifterEmail}. Reason: ${error}`;
      console.error(errorMessage);
      errors.push(gifterEmail);
    }
  }

  return Promise.resolve({
    sent: sent,
    errors: errors
  })
}

app.use(function (err, req, res, next) {
  res.status(500);
  res.send("Oops, something went wrong.")
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
