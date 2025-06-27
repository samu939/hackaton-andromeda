import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bs-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bs-modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="bs-modal" (click)="$event.stopPropagation()">
        <div class="bs-modal-header" *ngIf="title || showCloseButton">
          <h3 *ngIf="title">{{ title }}</h3>
          <button
            class="bs-close-btn"
            *ngIf="showCloseButton"
            (click)="close()"
            aria-label="Close modal">
            ×
          </button>
        </div>

        <div class="bs-modal-body">
          <ng-content></ng-content>
        </div>

        <div class="bs-modal-footer" *ngIf="showFooter">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bs-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
      backdrop-filter: blur(3px);
    }

    .bs-modal {
      background: #ffffff;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
      border: 2px solid #e1e8ed;
      position: relative;
    }

    .bs-modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid #e1e8ed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border-radius: 12px 12px 0 0;
    }

    .bs-modal-header h3 {
      margin: 0;
      color: var(--bs-text-dark);
      font-size: 18px;
      font-weight: 600;
    }

    .bs-close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--bs-text-light);
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .bs-close-btn:hover {
      color: var(--bs-text-dark);
      background: #f8f9fa;
    }

    .bs-modal-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
      background: #ffffff;
    }

    .bs-modal-footer {
      padding: 20px 24px;
      border-top: 1px solid #e1e8ed;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      background: #ffffff;
      border-radius: 0 0 12px 12px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 768px) {
      .bs-modal {
        width: 95%;
        margin: 20px;
        max-height: 80vh;
        min-height: auto;
      }

      .bs-modal-header,
      .bs-modal-body,
      .bs-modal-footer {
        padding: 16px;
      }

      .bs-modal-body {
        font-size: 14px;
        line-height: 1.4;
      }
    }

    /* Ensure text doesn't overflow */
    .bs-modal * {
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }

    /* Prevent horizontal scrolling */
    .bs-modal {
      overflow-x: hidden;
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() showCloseButton: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() closeOnEscape: boolean = true;

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  private previousIsOpen: boolean = false;

  ngOnInit() {
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.closeOnEscape) {
      document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
    }
  }

  ngOnChanges() {
    if (this.isOpen !== this.previousIsOpen) {
      if (this.isOpen) {
        this.opened.emit();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      } else {
        this.closed.emit();
        document.body.style.overflow = ''; // Restore scrolling
      }
      this.previousIsOpen = this.isOpen;
    }
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
    document.body.style.overflow = '';
  }

  onOverlayClick(_event: Event) {
    if (this.closeOnOverlayClick) {
      this.close();
    }
  }

  private handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }
}
