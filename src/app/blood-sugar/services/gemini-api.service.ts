import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { UserHealthData, BloodSugarAnalysis, ApiResponse } from '../models/blood-sugar.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {
  private readonly apiUrl = environment.geminiApiUrl;
  private apiKey = environment.geminiApiKey;

  constructor(private http: HttpClient) {}


  /**
   * Get the current API key status
   * @returns string describing the API key status
   */
  getApiKeyStatus(): string {
    if (!this.apiKey || this.apiKey.trim() === '') {
      return 'API key not configured. Please set your Gemini API key in the environment variables.';
    }
    return 'API key configured successfully.';
  }

  /**
   * Analyze blood sugar data using Gemini API
   * @param userData - User health data
   * @returns Observable with blood sugar analysis
   */
  analyzeBloodSugar(userData: UserHealthData): Observable<ApiResponse> {

    if (!this.apiKey || this.apiKey.trim() === '') {
      return throwError(() => new Error('Gemini API key not configured. Please set GEMINI_API_KEY in environment variables.'));
    }

    const prompt = this.buildPrompt(userData);
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}?key=${this.apiKey}`;

    return this.http.post<any>(url, requestBody, { headers }).pipe(
      map(response => this.parseGeminiResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Build the prompt for Gemini API
   * @param userData - User health data
   * @returns Formatted prompt string
   */
  private buildPrompt(userData: UserHealthData): string {
    // TODO: This is a placeholder prompt. You can customize this based on your needs.
    return `
       Vas a actuar como un profesional de la salud y vas a analizar los parametros referentes a azucar en sangre y peso que te voy a hacer llegar de manera profesional,ten en consideracion la edad y genero de la persona tambien para realizar las recomendaciones más precisas:

      Datos del usuario:
      - Edad: ${userData.age} años
      - Peso: ${userData.weight} ${userData.weightUnit}
      - Altura: ${this.formatHeight(userData)}
      - Género: ${userData.gender}
      - Nivel de glucosa: ${userData.bloodSugarLevel} mg/dL
      - Horas de ayuno: ${userData.fastingHours || 'No especificado'}
      - Nivel de actividad: ${userData.activityLevel}
      - Condiciones médicas: ${userData.medicalConditions.join(', ') || 'Ninguna'}
      - Medicamentos: ${userData.medications.join(', ') || 'Ninguno'}
      - Síntomas: ${userData.symptoms.join(', ') || 'Ninguno'}

      Por favor, responde ÚNICAMENTE con un objeto JSON válido que contenga:
      {
        "nivel_azucar": "normal|elevado|bajo|muy_elevado|muy_bajo",
        "recomendaciones": ["recomendación1", "recomendación2", ...],
        "alertas": ["alerta1", "alerta2", ...],
        "mensaje_motivacional": "mensaje motivacional personalizado"
      }

      Considera los rangos estándar de glucosa:
      - Normal: 70-99 mg/dL (ayuno), 70-140 mg/dL (postprandial)
      - Prediabetes: 100-125 mg/dL (ayuno), 140-199 mg/dL (postprandial)
      - Diabetes: ≥126 mg/dL (ayuno), ≥200 mg/dL (postprandial)
    `;
  }

  /**
   * Parse Gemini API response
   * @param response - Raw API response
   * @returns Parsed API response
   */
  private parseGeminiResponse(response: any): ApiResponse {
    try {
      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        const text = response.candidates[0].content.parts[0].text;
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
        const analysis: BloodSugarAnalysis = JSON.parse(cleanedText);

        return {
          success: true,
          data: analysis
        };
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return {
        success: false,
        error: 'Error parsing AI response'
      };
    }
  }

  /**
   * Handle HTTP errors
   * @param error - HTTP error response
   * @returns Error observable
   */
  private handleError(error: HttpErrorResponse): Observable<ApiResponse> {
    let errorMessage = 'Error inesperado, revise su conexión e intente más tarde';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = 'Error inesperado, revise su conexión e intente más tarde';
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Datos de solicitud inválidos. Intente nuevamente.';
          break;
        case 401:
          errorMessage = 'Clave de API inválida. Verifique su configuración.';
          break;
        case 403:
          errorMessage = 'Acceso a la API denegado. Verifique sus permisos.';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Intente más tarde.';
          break;
        case 500:
          errorMessage = 'Error del servidor. Intente más tarde.';
          break;
        case 0:
          errorMessage = 'Error de conexión. Verifique su internet.';
          break;
        default:
          errorMessage = 'Error inesperado, revise su conexión e intente más tarde';
      }
    }

    return of({
      success: false,
      error: errorMessage
    });
  }

  /**
   * Format height for display
   * @param userData - User health data
   * @returns Formatted height string
   */
  private formatHeight(userData: UserHealthData): string {
    if (userData.heightUnit === 'cm') {
      return `${userData.height} cm`;
    } else {
      return `${userData.heightFeet}'${userData.heightInches}"`;
    }
  }

  /**
   * Determine mock blood sugar level for testing
   * @param level - Blood sugar level in mg/dL
   * @returns Blood sugar level category
   */
  private determineMockBloodSugarLevel(level: number): 'normal' | 'elevado' | 'bajo' | 'muy_elevado' | 'muy_bajo' {
    if (level < 70) return 'muy_bajo';
    if (level < 80) return 'bajo';
    if (level <= 140) return 'normal';
    if (level <= 200) return 'elevado';
    return 'muy_elevado';
  }
}
