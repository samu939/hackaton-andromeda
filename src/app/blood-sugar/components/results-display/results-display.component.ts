import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodSugarAnalysis, UserHealthData } from '../../models/blood-sugar.models';

@Component({
  selector: 'bs-results-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss']
})
export class ResultsDisplayComponent {
  @Input() analysis!: BloodSugarAnalysis;
  @Input() userData!: UserHealthData;
  @Output() backToForm = new EventEmitter<void>();
  @Output() saveResults = new EventEmitter<{ analysis: BloodSugarAnalysis, userData: UserHealthData }>();

  get levelDisplayText(): string {
    const levelMap = {
      'normal': 'Normal',
      'elevado': 'Elevado',
      'bajo': 'Bajo',
      'muy_elevado': 'Muy Elevado',
      'muy_bajo': 'Muy Bajo'
    };
    return levelMap[this.analysis.nivel_azucar] || 'Desconocido';
  }

  get levelDescription(): string {
    const descriptions = {
      'normal': 'Su nivel de glucosa se encuentra dentro del rango normal. ¡Excelente!',
      'elevado': 'Su nivel de glucosa está por encima del rango normal. Se recomienda seguimiento médico.',
      'bajo': 'Su nivel de glucosa está por debajo del rango normal. Considere consumir algo dulce.',
      'muy_elevado': 'Su nivel de glucosa está significativamente elevado. Busque atención médica inmediata.',
      'muy_bajo': 'Su nivel de glucosa está peligrosamente bajo. Busque atención médica inmediata.'
    };
    return descriptions[this.analysis.nivel_azucar] || 'Nivel no determinado';
  }

  get levelIcon(): string {
    const icons = {
      'normal': '✅',
      'elevado': '⚠️',
      'bajo': '⬇️',
      'muy_elevado': '🚨',
      'muy_bajo': '🚨'
    };
    return icons[this.analysis.nivel_azucar] || '❓';
  }

  get levelColorClass(): string {
    return this.analysis.nivel_azucar;
  }

  onBackToForm() {
    this.backToForm.emit();
  }

  onSaveResults() {
    this.saveResults.emit({
      analysis: this.analysis,
      userData: this.userData
    });
  }

  formatUserData(): string {
    const { age, weight, weightUnit, height, heightUnit, gender, bloodSugarLevel } = this.userData;
    let heightStr = '';
    
    if (heightUnit === 'cm') {
      heightStr = `${height} cm`;
    } else {
      heightStr = `${this.userData.heightFeet}'${this.userData.heightInches}"`;
    }

    return `${age} años, ${weight} ${weightUnit}, ${heightStr}, ${gender}, ${bloodSugarLevel} mg/dL`;
  }

  getBloodSugarRange(): string {
    const level = this.userData.bloodSugarLevel;
    if (level < 70) return 'Hipoglucemia';
    if (level <= 99) return 'Normal (ayuno)';
    if (level <= 125) return 'Prediabetes';
    if (level <= 199) return 'Diabetes probable';
    return 'Diabetes confirmada';
  }

  getRangeColorClass(): string {
    const level = this.userData.bloodSugarLevel;
    if (level < 70) return 'muy_bajo';
    if (level <= 99) return 'normal';
    if (level <= 125) return 'elevado';
    if (level <= 199) return 'muy_elevado';
    return 'muy_elevado';
  }
}
