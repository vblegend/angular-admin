import { Component } from '@angular/core';

@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})
export class StatsCardFrontComponent {

  private alive = true;

  linesData: { firstLine: number[]; secondLine: number[] };

  constructor() {
    this.linesData = {
      firstLine: this.getDataForFirstLine(),
      secondLine: this.getDataForSecondLine(),
    };
  }






  getDataForFirstLine(): number[] {
    return this.createEmptyArray(100)
      .map((_, index) => {
        const oneFifth = index / 5;

        return (Math.sin(oneFifth) * (oneFifth - 10) + index / 6) * 5;
      });
  }

  getDataForSecondLine(): number[] {
    return this.createEmptyArray(100)
      .map((_, index) => {
        const oneFifth = index / 5;

        return (Math.cos(oneFifth) * (oneFifth - 10) + index / 6) * 5;
      });
  }

  createEmptyArray(nPoints: number) {
    return Array.from(Array(nPoints));
  }





}
