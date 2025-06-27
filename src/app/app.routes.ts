import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { BloodSugarAnalysisComponent } from './blood-sugar/blood-sugar-analysis.component';
import { BloodPressureManagerComponent } from './blood-pressure-manager/blood-pressure-manager.component'

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'blood-sugar', component: BloodSugarAnalysisComponent },
  { path: 'blood-pressure', component: BloodPressureManagerComponent },
  { path: '**', redirectTo: '' }
];
