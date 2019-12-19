interface Person {
  email: string;
}

export class App {
  heading = "Papa Noel Secreto!";
  roster: Person[] = [];
  personEmail = "";

  addPersonToRoster() {
    if (this.personEmail) {
      this.roster.push({
        email: this.personEmail
      });
      this.personEmail = "";
    }
  }

  removePersonFromRoster(person) {
    let index = this.roster.indexOf(person);
    if (index !== -1) {
      this.roster.splice(index, 1);
    }
  }

  submitRoster(roster: string[]) {
    // TODO
    console.log(`Got this roster: ${roster}`);
  }
}
