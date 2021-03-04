import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'papa-noel-secreto-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  gifters: Array<string>

  constructor() { }

  ngOnInit(): void {
  }

}
