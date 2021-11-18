import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-country-orders',
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Country Orders Statistics</nb-card-header>
      <nb-card-body>

        <ngx-country-orders-chart [countryName]="countryName"
                                  [data]="countryData"
                                  [labels]="countriesCategories"
                                  maxValue="20">
        </ngx-country-orders-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnInit, OnDestroy {

  private alive = true;

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countriesCategories = [
      'Sofas',
      'Furniture',
      'Lighting',
      'Tables',
      'Textiles',
    ];
    this.selectCountryById('Sofas');
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;
    this.countryData = this.generateRandomData(5);
  }


  private generateRandomData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 20);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
