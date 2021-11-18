import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';

export interface OrderProfitChartSummary {
  title: string;
  value: number;
}
export interface ProfitChart {
  chartLabel: string[];
  data: number[][];
}
export interface OrdersChart {
  chartLabel: string[];
  linesData: number[][];
}
@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor() {

    this.chartPanelSummary = [
      {
        title: 'Marketplace',
        value: 3654,
      },
      {
        title: 'Last Month',
        value: 946,
      },
      {
        title: 'Last Week',
        value: 654,
      },
      {
        title: 'Today',
        value: 230,
      },
    ];

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersChartData = this.getDataForYearPeriod();
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }
  private getDataForYearPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(42, [
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
      ]),
      linesData: [
        [
          190, 269, 327, 366, 389, 398,
          396, 387, 375, 359, 343, 327,
          312, 298, 286, 276, 270, 268,
          265, 258, 247, 234, 220, 204,
          188, 172, 157, 142, 128, 116,
          106, 99, 95, 94, 92, 89, 84,
          77, 69, 60, 49, 36, 22,
        ],
        [
          265, 307, 337, 359, 375, 386,
          393, 397, 399, 397, 390, 379,
          365, 347, 326, 305, 282, 261,
          241, 223, 208, 197, 190, 187,
          185, 181, 172, 160, 145, 126,
          105, 82, 60, 40, 26, 19, 22,
          43, 82, 141, 220, 321,
        ],
        [
          9, 165, 236, 258, 244, 206,
          186, 189, 209, 239, 273, 307,
          339, 365, 385, 396, 398, 385,
          351, 300, 255, 221, 197, 181,
          170, 164, 162, 161, 159, 154,
          146, 135, 122, 108, 96, 87,
          83, 82, 82, 82, 82, 82, 82,
        ],
      ],
    };
  }





  getProfitChartData(period: string) {
    this.profitChartData = { chartLabel: [], data: [] };
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
