import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recommendations-display',
  standalone: true,
  imports: [NgFor],
  templateUrl: './recommendations-display.component.html',
  styleUrls: ['./recommendations-display.component.css']
})
export class RecommendationsDisplayComponent {
  // Recibe los datos del componente padre (app.component)
  @Input() data: any; 
  
  // Evento para notificar al padre que se quiere reiniciar la vista
  @Output() reset = new EventEmitter<void>();

  print() {
    // La función de impresión nativa del navegador es la más sencilla y efectiva
    window.print();
  }
}
