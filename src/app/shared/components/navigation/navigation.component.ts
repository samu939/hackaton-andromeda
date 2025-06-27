import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navigation-bar">
      <div class="nav-container">
        <div class="nav-brand" (click)="navigateHome()">
          <img src="assets/images/health-logo.svg" alt="Logo" class="nav-logo">
          <span class="nav-title">Centro de Salud</span>
        </div>

        <div class="nav-links">
          <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <span class="nav-icon">🏠</span>
            <span>Inicio</span>
          </a>
          <a routerLink="/blood-sugar" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">🩸</span>
            <span>Glucosa</span>
          </a>
          <a routerLink="/blood-pressure" class="nav-link" routerLinkActive="active">
            <span class="nav-icon">💓</span>
            <span>Presión</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navigation-bar {
      background: linear-gradient(135deg, #080147, #475c94);
      color: white;
      padding: 12px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .nav-brand:hover {
      opacity: 0.8;
    }

    .nav-logo {
      width: 80px;
      filter: brightness(0) invert(1);
    }

    .nav-title {
      font-size: 20px;
      font-weight: 700;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: all 0.3s ease;
      opacity: 0.8;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      opacity: 1;
    }

    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
      opacity: 1;
    }

    .nav-icon {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .nav-container {
        padding: 0 16px;
      }

      .nav-title {
        display: none;
      }

      .nav-links {
        gap: 4px;
      }

      .nav-link {
        padding: 8px 12px;
        font-size: 14px;
      }

      .nav-link span:not(.nav-icon) {
        display: none;
      }
    }
  `]
})
export class NavigationComponent {

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }
}
