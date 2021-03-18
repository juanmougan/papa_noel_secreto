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
        rosterId => console.log("Generated a roster with ID", rosterId),
        err => console.error('HTTP Error', err),
      );
  }
}
