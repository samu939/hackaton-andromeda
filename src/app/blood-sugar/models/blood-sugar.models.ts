// Blood Sugar Analysis Models and Interfaces

export interface BloodSugarAnalysis {
  nivel_azucar: 'normal' | 'elevado' | 'bajo' | 'muy_elevado' | 'muy_bajo';
  recomendaciones: string[]; // Specific daily health recommendations
  alertas: string[]; // Important health alerts or warnings
  mensaje_motivacional: string; // Motivational message for the user
}

export interface UserHealthData {
  age: number;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  height: number;
  heightUnit: 'cm' | 'ft-in';
  heightFeet?: number; // For ft-in unit
  heightInches?: number; // For ft-in unit
  gender: 'male' | 'female' | 'other';
  bloodSugarLevel: number; // mg/dL
  fastingHours?: number; // Hours since last meal
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  medicalConditions: string[];
  medications: string[];
  symptoms: string[];
}

export interface ApiResponse {
  success: boolean;
  data?: BloodSugarAnalysis;
  error?: string;
  message?: string;
}

export interface FormValidationErrors {
  [key: string]: string;
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}

// Enums for better type safety
export enum WeightUnit {
  KG = 'kg',
  LBS = 'lbs'
}

export enum HeightUnit {
  CM = 'cm',
  FT_IN = 'ft-in'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHT = 'light',
  MODERATE = 'moderate',
  ACTIVE = 'active',
  VERY_ACTIVE = 'very_active'
}

export enum BloodSugarLevel {
  NORMAL = 'normal',
  ELEVADO = 'elevado',
  BAJO = 'bajo',
  MUY_ELEVADO = 'muy_elevado',
  MUY_BAJO = 'muy_bajo'
}

// Common medical conditions for dropdown
export const COMMON_MEDICAL_CONDITIONS = [
  'Diabetes Tipo 1',
  'Diabetes Tipo 2',
  'Prediabetes',
  'Hipertension',
  'Enfermedad Cardíaca',
  'Desorden Tiroideo',
  'Enfermedad Renal',
  'Enfermedad Hepática',
  'PCOS',
  'Sindrome Metabólico'
];

// Common medications that affect blood sugar
export const COMMON_MEDICATIONS = [
  'Metformina',
  'Insulina',
  'Sulfonylureas',
  'DPP-4 inhibidores',
  'GLP-1 agonists',
  'SGLT-2 inhibidores',
  'Beta bloqueadores',
  'Corticosteroides',
  'Diureticos'
];

// Common symptoms related to blood sugar
export const COMMON_SYMPTOMS = [
  'Urinacion frecuente',
  'Sed excesiva',
  'Fatiga',
  'Vision borrosa',
  'Heridas lentas en curación',
  'Infecciones frecuentes',
  'Cosquilleo en manos/pies',
  'Perdida de peso inexplicada',
  'Hambres excesivas',
  'Mareos',
  'Dolores de cabeza'
];
