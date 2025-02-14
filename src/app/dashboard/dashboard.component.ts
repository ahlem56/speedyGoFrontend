import { Component, AfterViewInit } from '@angular/core';
//declare var require: any;

@Component({
    templateUrl: './dashboard.component.html',
    standalone: false
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() { }
}
