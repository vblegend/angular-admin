import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'ngx-stats-card-back',
  styleUrls: ['./stats-card-back.component.scss'],
  templateUrl: './stats-card-back.component.html',
})
export class StatsCardBackComponent implements OnDestroy {

  private alive = true;

  chartData: number[];

  constructor() {
    this.chartData = [
      300, 520, 435, 530,
      730, 620, 660, 860,
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
