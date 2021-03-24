import { Component, OnInit } from '@angular/core';
import { RosterService } from '../roster.service';

@Component({
  selector: 'papa-noel-secreto-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  gifters: Array<string>;
  newGifter: string;
  congratsMessage: string
  errorMessage: string
  submitButtonEnabled = true

  constructor(private rosterService: RosterService) {}

  ngOnInit(): void {
    this.gifters = [];
    this.newGifter = '';
  }

  addGifter() {
    this.gifters.push(this.newGifter);
    this.newGifter = '';
    this.resetMessages();
  }

  resetMessages() {
    this.congratsMessage = null;
    this.errorMessage = null;
  }

  removeGifter(index: number) {
    this.gifters.splice(index, 1);
  }

  onSubmit() {
    this.submitButtonEnabled = false
    console.log(this.gifters);
    this.rosterService.submitRoster(this.gifters)
      .subscribe(
        // TODO show a congrats screen
        rosterId => this.onRosterGenerated(rosterId),
        err => this.onError(err),
      );
  }

  onRosterGenerated(rosterId: string) {
    this.gifters = []
    this.congratsMessage = "Sent an email to all the participants!"
    this.submitButtonEnabled = true
  }

  onError(err) {
    console.error('HTTP Error', err)
    // TODO migrate to a snackbar
    // https://stackoverflow.com/questions/53659123/how-to-dismiss-close-an-angular-snackbar-element-from-inside-element
    this.errorMessage = err
  }
}
