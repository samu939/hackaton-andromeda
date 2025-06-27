import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-blood-pressure-analysis',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <div class="blood-pressure-analysis">
      <div class="container">
        <div class="coming-soon-card">
          <div class="icon-container">
            <img src="assets/images/pressure-icon.svg" alt="Presión Arterial" class="main-icon">
          </div>
          <h1 class="title">Análisis de Presión Arterial</h1>
          <p class="subtitle">Próximamente disponible</p>
          <div class="description">
            <p>
              Estamos trabajando en una herramienta completa para el análisis de presión arterial 
              que incluirá evaluación cardiovascular, factores de riesgo y recomendaciones personalizadas.
            </p>
          </div>
          <div class="features-preview">
            <h3>Características que incluirá:</h3>
            <ul>
              <li>📊 Evaluación completa de presión arterial</li>
              <li>❤️ Análisis de salud cardiovascular</li>
              <li>⚠️ Identificación de factores de riesgo</li>
              <li>💡 Recomendaciones personalizadas</li>
              <li>📈 Seguimiento de tendencias</li>
            </ul>
          </div>
          <div class="cta-section">
            <p class="cta-text">Mientras tanto, puedes usar nuestro análisis de glucosa</p>
            <a routerLink="/blood-sugar" class="cta-button">
              <span class="btn-icon">🩸</span>
              <span>Analizar Glucosa</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blood-pressure-analysis {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 40px 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .coming-soon-card {
      background: white;
      border-radius: 20px;
      padding: 60px 40px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e1e8ed;
    }

    .icon-container {
      margin-bottom: 32px;
    }

    .main-icon {
      width: 120px;
      height: 120px;
      filter: drop-shadow(0 8px 16px rgba(204, 37, 45, 0.2));
    }

    .title {
      font-size: 36px;
      font-weight: 700;
      color: #cc252d;
      margin-bottom: 12px;
    }

    .subtitle {
      font-size: 20px;
      color: #7f8c8d;
      margin-bottom: 32px;
      font-weight: 500;
    }

    .description {
      margin-bottom: 40px;
    }

    .description p {
      font-size: 16px;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
    }

    .features-preview {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 40px;
      text-align: left;
    }

    .features-preview h3 {
      color: #cc252d;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      text-align: center;
    }

    .features-preview ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .features-preview li {
      padding: 8px 0;
      font-size: 14px;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cta-section {
      border-top: 1px solid #e1e8ed;
      padding-top: 32px;
    }

    .cta-text {
      font-size: 16px;
      color: #7f8c8d;
      margin-bottom: 20px;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #475c94, #080147);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(71, 92, 148, 0.3);
    }

    .btn-icon {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .blood-pressure-analysis {
        padding: 20px 16px;
      }

      .coming-soon-card {
        padding: 40px 24px;
      }

      .title {
        font-size: 28px;
      }

      .subtitle {
        font-size: 18px;
      }

      .main-icon {
        width: 80px;
        height: 80px;
      }
    }
  `]
})
export class BloodPressureAnalysisComponent {}
