import { Component } from '@angular/core';
import { BloodPressureInputComponent } from '../blood-pressure-input/blood-pressure-input.component';
import { RecommendationsDisplayComponent } from '../recommendations-display/recommendations-display.component';
import { CommonModule, NgIf } from '@angular/common';
import { NavigationComponent } from '../shared/components/navigation/navigation.component'

@Component({
  selector: 'app-blood-pressure-manager',
  standalone: true,
  imports: [NgIf, BloodPressureInputComponent, RecommendationsDisplayComponent, NavigationComponent, CommonModule],
  templateUrl: './blood-pressure-manager.component.html',
  styleUrls: ['./blood-pressure-manager.component.css']
})
export class BloodPressureManagerComponent {

  // El estado ahora vive DENTRO de este componente
  recommendations: any = null;

  // La función que recibe los datos del formulario
  onNewReading(pressureData: { systolic: number, diastolic: number }) {
    console.log('Datos recibidos en el manager:', pressureData);

    // --- SIMULACIÓN DE LLAMADA A LA API DE GEMINI ---
    this.recommendations = this.getFakeGeminiResponse(pressureData);
  }

  // La función para resetear la vista y mostrar el formulario de nuevo
  resetForm() {
    this.recommendations = null;
  }

  // La función que genera la respuesta simulada
  getFakeGeminiResponse(data: { systolic: number, diastolic: number }): any {
    return {
      systolic: data.systolic,
      diastolic: data.diastolic,
      interpretation: `Gracias por compartir tus datos. Una lectura de ${data.systolic}/${data.diastolic} mmHg sugiere que hoy tu presión está un poco elevada. ¡No te preocupes! Gestionarlo es más sencillo de lo que parece.`,
      recommendations: [
        { icon: '🚶‍♂️', text: 'Da una caminata suave de 20 minutos al aire libre. Disfruta del paisaje y respira profundamente.' },
        { icon: '🥗', text: 'Considera reducir la sal en tu próxima comida. Prueba usar hierbas y especias para dar sabor.' },
        { icon: '🧘‍♀️', text: 'Tómate 5 minutos para hacer ejercicios de respiración. Inhala lento por la nariz, sostén y exhala por la boca.' }
      ],
      contact: 'Recuerda que estas son sugerencias generales. Para un consejo personalizado, te recomendamos hablar con tu médico de',
      contactLinkText: 'HolaDoc',
      closingMessage: '¡Pequeños pasos hacen una gran diferencia! Estamos aquí para apoyarte.'
    };
  }
}
