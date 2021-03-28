import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { shuffleRoster } from './services/shuffle_service'
import { sendMail } from './services/mail_service'

@Controller('roster')
export class RosterController {
  @Post()
  create(@Body() body: string[]): any {
    // TODO change the API, it's parsing a list like this: [ 'first', 'second' ]
    // and it should eventually be {"name": "juan", "juan@mail.com"}
    const gifterReceiverMap = shuffleRoster(body);
    this.sendMails(gifterReceiverMap)
      .then(data => {
        const { sent, errors } = data
        console.log("Errors", errors);
        console.log("Sent", sent);
        if (errors && errors.length) {
            throw new HttpException(JSON.stringify({
                sent: sent,
                errors: errors
              }), HttpStatus.BAD_REQUEST);
        } else {
          return {
            sent: sent
          }
        }
      });
  }

  async sendMails(gifterReceiverMap) {
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
}
