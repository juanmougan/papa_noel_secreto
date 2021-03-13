import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'papa-noel-secreto-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
})
export class RosterComponent implements OnInit {
  gifters: Array<string>;
  newGifter: string;

  constructor() {}

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

  onSubmit() {}
}
