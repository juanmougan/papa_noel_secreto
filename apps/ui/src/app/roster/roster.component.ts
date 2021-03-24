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
  errorMessage: string

  constructor(private rosterService: RosterService) {}

  ngOnInit(): void {
    this.gifters = [];
    this.newGifter = '';
  }

  addGifter() {
    this.gifters.push(this.newGifter);
    this.newGifter = '';
  }

  removeGifter(index: number) {
    this.gifters.splice(index, 1);
  }

  onSubmit() {
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
    // TODO show congrats banner
  }

  onError(err) {
    console.error('HTTP Error', err)
    // TODO migrate to a snackbar
    // https://stackoverflow.com/questions/53659123/how-to-dismiss-close-an-angular-snackbar-element-from-inside-element
    this.errorMessage = err
  }
}
