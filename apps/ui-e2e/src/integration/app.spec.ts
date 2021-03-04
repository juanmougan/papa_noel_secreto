import { getGifterInput, getAddGifterToRosterButton, getRosterList } from '../support/app.po';

describe('ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should add several gifters to the roster and remove one too', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome to ui!');
    getGifterInput().type('first');
    getAddGifterToRosterButton().click();
    getGifterInput().type('second');
    getAddGifterToRosterButton().click();
    getGifterInput().type('third');
    getAddGifterToRosterButton().click();
    // getRosterList().should((l) => expect(l.length).equal(3));    // TODO I need the parent component here

    // TODO add code for the remove button, and assert 'second' was not found
  });
});
