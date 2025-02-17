import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-carpooling-create',
    templateUrl: './carpooling-create.component.html',
    styleUrls: ['./carpooling-create.component.css'],
    standalone: false
})
export class CarpoolingCreateFrontOfficeComponent {
    constructor(private router: Router) {}

    joinCarpool() {
      this.router.navigate(['/carpooling/join']);
    }

    showForm = false;

    displayForm() {
      this.showForm = true; 
}

submitCarpool() {
    console.log("Price:", this.tripPrice);
    console.log("Conditions:", this.selectedConditions);
    alert('carpool Created Successfully! \nPrice: ${this.tripPrice}TND \nConditions: ${this.selectedConditions.join(", ")}');
    this.showForm = false;
  }
  
  selectedConditions: string[] = [];
  conditions = [
    "Women only",
    "No pets",
    "No loud music",
    "Non-smoking car",
    "No food in the car",
  ];

  toggleCondition(condition: string) {
    if (this.selectedConditions.includes(condition)) {
      this.selectedConditions = this.selectedConditions.filter(c => c !== condition);
    } else {
      this.selectedConditions.push(condition);
    }
  }
  tripPrice: number | null = null;
}