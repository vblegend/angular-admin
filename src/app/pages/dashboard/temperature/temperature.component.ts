import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';


export interface Temperature {
  value: number;
  min: number;
  max: number;
}


@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})
export class TemperatureComponent implements OnDestroy {

  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';

  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        this.theme = config.variables.temperature;
      });

    this.temperatureData = {
      value: 87,
      min: 0,
      max: 100,
    };
    this.temperature = this.temperatureData.value;

    this.humidityData = {
      value: 24,
      min: 12,
      max: 30,
    };
    this.humidity = this.humidityData.value;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
