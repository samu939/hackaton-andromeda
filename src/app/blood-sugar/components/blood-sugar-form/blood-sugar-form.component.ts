import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UserHealthData,
  WeightUnit,
  HeightUnit,
  Gender,
  ActivityLevel,
  COMMON_MEDICAL_CONDITIONS,
  COMMON_MEDICATIONS,
  COMMON_SYMPTOMS
} from '../../models/blood-sugar.models';

@Component({
  selector: 'bs-blood-sugar-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blood-sugar-form.component.html',
  styleUrls: ['./blood-sugar-form.component.scss']
})
export class BloodSugarFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<UserHealthData>();

  bloodSugarForm!: FormGroup;

  // Enum references for template
  WeightUnit = WeightUnit;
  HeightUnit = HeightUnit;
  Gender = Gender;
  ActivityLevel = ActivityLevel;

  // Options for dropdowns
  medicalConditions = COMMON_MEDICAL_CONDITIONS;
  medications = COMMON_MEDICATIONS;
  symptoms = COMMON_SYMPTOMS;

  // Form state
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.bloodSugarForm = this.fb.group({
      // Basic information
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      weight: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      weightUnit: [WeightUnit.KG, Validators.required],
      height: ['', [Validators.required, Validators.min(1)]],
      heightUnit: [HeightUnit.CM, Validators.required],
      heightFeet: [''],
      heightInches: [''],
      gender: ['', Validators.required],

      // Blood sugar information
      bloodSugarLevel: ['', [Validators.required, Validators.min(20), Validators.max(800)]],
      fastingHours: [''],

      // Lifestyle information
      activityLevel: ['', Validators.required],

      // Medical information
      medicalConditions: [[]],
      medications: [[]],
      symptoms: [[]]
    });

    // Watch for height unit changes
    this.bloodSugarForm.get('heightUnit')?.valueChanges.subscribe(unit => {
      this.updateHeightValidators(unit);
    });
  }

  private updateHeightValidators(unit: HeightUnit) {
    const heightControl = this.bloodSugarForm.get('height');
    const heightFeetControl = this.bloodSugarForm.get('heightFeet');
    const heightInchesControl = this.bloodSugarForm.get('heightInches');

    if (unit === HeightUnit.CM) {
      heightControl?.setValidators([Validators.required, Validators.min(50), Validators.max(300)]);
      heightFeetControl?.clearValidators();
      heightInchesControl?.clearValidators();
      heightFeetControl?.setValue('');
      heightInchesControl?.setValue('');
    } else {
      heightControl?.clearValidators();
      heightFeetControl?.setValidators([Validators.required, Validators.min(3), Validators.max(8)]);
      heightInchesControl?.setValidators([Validators.required, Validators.min(0), Validators.max(11)]);
      heightControl?.setValue('');
    }

    heightControl?.updateValueAndValidity();
    heightFeetControl?.updateValueAndValidity();
    heightInchesControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.bloodSugarForm.valid) {
      this.isSubmitting = true;
      const formData = this.bloodSugarForm.value;

      const userData: UserHealthData = {
        age: formData.age,
        weight: formData.weight,
        weightUnit: formData.weightUnit,
        height: formData.heightUnit === HeightUnit.CM ? formData.height : 0,
        heightUnit: formData.heightUnit,
        heightFeet: formData.heightFeet || undefined,
        heightInches: formData.heightInches || undefined,
        gender: formData.gender,
        bloodSugarLevel: formData.bloodSugarLevel,
        fastingHours: formData.fastingHours || undefined,
        activityLevel: formData.activityLevel,
        medicalConditions: formData.medicalConditions || [],
        medications: formData.medications || [],
        symptoms: formData.symptoms || []
      };

      this.formSubmit.emit(userData);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.bloodSugarForm.controls).forEach(key => {
      const control = this.bloodSugarForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bloodSugarForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.bloodSugarForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
    }
    return '';
  }

  onDropdownSelect(event: Event, controlName: string) {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;

    if (selectedValue && selectedValue !== '') {
      const currentValues = this.bloodSugarForm.get(controlName)?.value || [];

      // Check if the value is not already selected
      if (!currentValues.includes(selectedValue)) {
        const newValues = [...currentValues, selectedValue];
        this.bloodSugarForm.get(controlName)?.setValue(newValues);
      }

      // Reset the dropdown to default option
      select.value = '';
    }
  }

  removeSelectedItem(item: string, controlName: string) {
    const currentValues = this.bloodSugarForm.get(controlName)?.value || [];
    const newValues = currentValues.filter((value: string) => value !== item);
    this.bloodSugarForm.get(controlName)?.setValue(newValues);
  }

  getSelectedItems(controlName: string): string[] {
    return this.bloodSugarForm.get(controlName)?.value || [];
  }

  resetForm() {
    this.bloodSugarForm.reset();
    this.initializeForm();
    this.isSubmitting = false;
  }

  // Helper methods for template
  get isHeightInFeetInches(): boolean {
    return this.bloodSugarForm.get('heightUnit')?.value === HeightUnit.FT_IN;
  }

  get isHeightInCm(): boolean {
    return this.bloodSugarForm.get('heightUnit')?.value === HeightUnit.CM;
  }
}
