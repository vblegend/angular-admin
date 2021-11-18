import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
export interface TrafficList {
  date: string;
  value: number;
  delta: {
    up: boolean;
    value: number;
  };
  comparison: {
    prevDate: string;
    prevValue: number;
    nextDate: string;
    nextValue: number;
  };
}

export interface TrafficBar {
  data: number[];
  labels: string[];
  formatter: string;
}
@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;
  private data = { };
  trafficBarData: TrafficBar;
  trafficListData: TrafficList;
  revealed = false;
  period: string = 'years';

  constructor() {


    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(),
      year: this.getDataForYearPeriod(),
    };
    this.getTrafficFrontCardData(this.period);
    this.getTrafficBackCardData(this.period);
  }

  getDataForWeekPeriod(): TrafficBar {
    return {
      data: [10, 15, 19, 7, 20, 13, 15],
      labels:  [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ],
      formatter: '{c0} MB',
    };
  }

  getDataForMonthPeriod(): TrafficBar {
    return {
      data: [0.5, 0.3, 0.8, 0.2, 0.3, 0.7, 0.8, 1, 0.7, 0.8, 0.6, 0.7],
      labels:  [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec',
      ],
      formatter: '{c0} GB',
    };
  }

  getDataForYearPeriod(): TrafficBar {
    return {
      data: [10, 15, 19, 7, 20, 13, 15, 19, 11],
      labels: [
        '2010', '2011', '2012',
        '2013', '2014', '2015',
        '2016', '2017', '2018',
      ],
      formatter: '{c0} GB',
    };
  }

 

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;
    this.getTrafficFrontCardData(value);
    this.getTrafficBackCardData(value);
  }

  getTrafficBackCardData(period: string) {
    this.trafficBarData = {
      data: [10, 15, 19, 7, 20, 13, 15, 19, 11],
      labels: [
        '2010', '2011', '2012',
        '2013', '2014', '2015',
        '2016', '2017', '2018',
      ],
      formatter: '{c0} GB',
    };
  }

  getTrafficFrontCardData(period: string) {
    this.trafficListData = this.data[period]
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
