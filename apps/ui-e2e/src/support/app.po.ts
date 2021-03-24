export const getGreeting = () => cy.get('h1');
export const getGifterInput = () => cy.get('input#gifter-input-id');
export const getAddGifterToRosterButton = () => cy.get('button#gifter-add-btn-id');
export const findRemoveGifterButtonByText = (text: string) => cy.contains(text);
export const getRosterList = () => cy.get('ul#roster-ul')
