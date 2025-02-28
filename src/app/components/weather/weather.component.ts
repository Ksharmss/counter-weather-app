import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  city = '';
  locations: { name: string; temp: number; icon: string, forecast: any }[] = [];
  selectedForecast: any = null;

  constructor(private http: HttpClient) {}

  addCity() {
    if (this.city) {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`)
        .subscribe(response => {
          if (this.locations.length >= 8) this.locations.pop();
          this.locations.unshift({
            name: response.name,
            temp: response.main.temp,
            icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`,
            forecast: null
          });
          this.city = '';
        }, error => {
          console.error('Error fetching weather data:', error);
          alert('Failed to fetch weather data. Please try again later.');
        });
    }
  }

  removeCity(index: number) {
    this.locations.splice(index, 1);
    this.selectedForecast = null;
  }

  refreshCity(index: number) {
    let cityName = this.locations[index].name;
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`)
      .subscribe(response => {
        this.locations[index].temp = response.main.temp;
        this.locations[index].icon = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
      }, error => {
        console.error('Error refreshing weather data:', error);
        alert('Failed to refresh weather data. Please try again later.');
      });
  }

  getForecast(index: number) {
    let cityName = this.locations[index].name;
    this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apiKey}&units=metric`)
      .subscribe(response => {
        this.selectedForecast = response.list.slice(0, 5);
      }, error => {
        console.error('Error fetching forecast data:', error);
        alert('Failed to fetch forecast data. Please try again later.');
      });
  }

  clearAll() {
    this.locations = [];
    this.selectedForecast = null;
  }
}
