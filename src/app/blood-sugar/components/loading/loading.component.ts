import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bs-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bs-loading" [class.bs-modal-overlay]="overlay">
      <div class="bs-loading-content" [class.bs-modal]="overlay">
        <div class="bs-spinner"></div>
        <div class="bs-loading-text">{{ message }}</div>
        <div class="bs-loading-subtext" *ngIf="subMessage">{{ subMessage }}</div>
      </div>
    </div>
  `,
  styles: [`
    .bs-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
    }

    .bs-loading.bs-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    .bs-loading-content.bs-modal {
      background: var(--bs-primary-white);
      border-radius: 12px;
      padding: 40px;
      max-width: 400px;
      width: 90%;
      animation: slideUp 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .bs-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e1e8ed;
      border-top: 4px solid var(--bs-primary-medium);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
      margin-left: 80px;


    }

    .bs-loading-text {
      color: var(--bs-text-dark);
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .bs-loading-subtext {
      color: var(--bs-text-light);
      font-size: 14px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = 'Cargando...';
  @Input() subMessage: string = '';
  @Input() overlay: boolean = false;
}
