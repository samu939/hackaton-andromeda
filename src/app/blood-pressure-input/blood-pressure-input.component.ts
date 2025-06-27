import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-blood-pressure-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './blood-pressure-input.component.html',
  styleUrls: ['./blood-pressure-input.component.css']
})
export class BloodPressureInputComponent {
  // Evento que enviará los datos al componente padre (app.component)
  @Output() newReading = new EventEmitter<{ systolic: number, diastolic: number }>();
  
  pressureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pressureForm = this.fb.group({
      // Validadores para asegurar que los datos son numéricos y están en un rango lógico
      systolic: ['', [Validators.required, Validators.min(70), Validators.max(250)]],
      diastolic: ['', [Validators.required, Validators.min(40), Validators.max(150)]],
    });
  }

  onSubmit() {
    if (this.pressureForm.valid) {
      // Emitimos el valor del formulario al componente padre
      this.newReading.emit(this.pressureForm.value);
    }
  }
}