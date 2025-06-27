import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodSugarFormComponent } from './components/blood-sugar-form/blood-sugar-form.component';
import { ResultsDisplayComponent } from './components/results-display/results-display.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { GeminiApiService } from './services/gemini-api.service';
import { UserHealthData, BloodSugarAnalysis, ApiResponse, LoadingState } from './models/blood-sugar.models';

export enum AnalysisState {
  FORM = 'form',
  LOADING = 'loading',
  RESULTS = 'results',
  ERROR = 'error'
}

@Component({
  selector: 'app-blood-sugar-analysis',
  standalone: true,
  imports: [
    CommonModule,
    BloodSugarFormComponent,
    ResultsDisplayComponent,
    LoadingComponent,
    ModalComponent,
    NavigationComponent
  ],
  templateUrl: './blood-sugar-analysis.component.html',
  styleUrls: ['./blood-sugar-analysis.component.scss']
})
export class BloodSugarAnalysisComponent implements OnInit {
  // State management
  currentState: AnalysisState = AnalysisState.FORM;
  AnalysisState = AnalysisState; // For template access

  // Data
  currentUserData: UserHealthData | null = null;
  currentAnalysis: BloodSugarAnalysis | null = null;

  // Loading state
  loadingState: LoadingState = {
    isLoading: false,
    message: 'Analizando sus datos...'
  };

  // Error handling
  errorMessage: string = '';
  showErrorModal: boolean = false;

  constructor(private geminiApiService: GeminiApiService) {}

  ngOnInit() {
    this.resetToForm();
  }

  /**
   * Handle form submission
   */
  onFormSubmit(userData: UserHealthData) {
    this.currentUserData = userData;
    this.analyzeBloodSugar(userData);
  }

  /**
   * Analyze blood sugar data
   */
  private analyzeBloodSugar(userData: UserHealthData) {
    this.currentState = AnalysisState.LOADING;
    this.loadingState = {
      isLoading: true,
      message: 'Analizando sus datos de salud...'
    };

    // Choose between mock and real API
    const analysisObservable = this.geminiApiService.analyzeBloodSugar(userData);

    analysisObservable.subscribe({
      next: (response: ApiResponse) => {
        this.handleApiResponse(response);
      },
      error: (error) => {
        this.handleApiError(error);
      }
    });
  }

  /**
   * Handle API response
   */
  private handleApiResponse(response: ApiResponse) {
    this.loadingState.isLoading = false;

    if (response.success && response.data) {
      this.currentAnalysis = response.data;
      this.currentState = AnalysisState.RESULTS;
    } else {
      this.handleApiError(response.error || 'Error desconocido en el análisis');
    }
  }

  /**
   * Handle API errors
   */
  private handleApiError(error: any) {
    this.loadingState.isLoading = false;
    this.currentState = AnalysisState.ERROR;

    if (typeof error === 'string') {
      this.errorMessage = error;
    } else if (error?.message) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = 'Error inesperado, revise su conexión e intente más tarde';
    }

    this.showErrorModal = true;
  }

  /**
   * Handle back to form action
   */
  onBackToForm() {
    this.resetToForm();
  }

  /**
   * Handle save results action
   */
  onSaveResults(data: { analysis: BloodSugarAnalysis, userData: UserHealthData }) {
    // Here you could implement saving to local storage, database, or export functionality
    const resultsData = {
      timestamp: new Date().toISOString(),
      userData: data.userData,
      analysis: data.analysis
    };

    // Save to localStorage for now
    const savedResults = JSON.parse(localStorage.getItem('bloodSugarResults') || '[]');
    savedResults.push(resultsData);
    localStorage.setItem('bloodSugarResults', JSON.stringify(savedResults));

    // Show success message
    alert('Resultados guardados exitosamente en el almacenamiento local del navegador.');
  }

  /**
   * Handle retry analysis
   */
  onRetryAnalysis() {
    if (this.currentUserData) {
      this.analyzeBloodSugar(this.currentUserData);
    } else {
      this.resetToForm();
    }
    this.closeErrorModal();
  }

  /**
   * Close error modal
   */
  closeErrorModal() {
    this.showErrorModal = false;
    this.errorMessage = '';
  }

  /**
   * Reset to form state
   */
  private resetToForm() {
    this.currentState = AnalysisState.FORM;
    this.currentUserData = null;
    this.currentAnalysis = null;
    this.loadingState.isLoading = false;
    this.errorMessage = '';
    this.showErrorModal = false;
  }

  // Getter methods for template
  get isFormState(): boolean {
    return this.currentState === AnalysisState.FORM;
  }

  get isLoadingState(): boolean {
    return this.currentState === AnalysisState.LOADING;
  }

  get isResultsState(): boolean {
    return this.currentState === AnalysisState.RESULTS;
  }

  get isErrorState(): boolean {
    return this.currentState === AnalysisState.ERROR;
  }

  get canShowResults(): boolean {
    return this.isResultsState && this.currentAnalysis != null && this.currentUserData != null;
  }
}
