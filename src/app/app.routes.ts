import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
    { path: '', redirectTo: 'counter', pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'vatavaran', component: WeatherComponent }
  ];
