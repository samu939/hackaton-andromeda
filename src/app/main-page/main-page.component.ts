import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  
  constructor(private router: Router) {}

  navigateToBloodSugar() {
    this.router.navigate(['/blood-sugar']);
  }

  navigateToBloodPressure() {
    this.router.navigate(['/blood-pressure']);
  }
}
