import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';


export interface OutlineData {
  label: string;
  value: number;
}

@Component({
  selector: 'ngx-ecommerce-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnDestroy {
  private alive = true;

  pieChartValue: number;
  chartLegend: { iconColor: string; title: string }[];
  visitorsAnalyticsData: { innerLine: number[]; outerLine: OutlineData[]; };

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.setLegendItems(theme.variables.visitorsLegend);
      });

    this.visitorsAnalyticsData = {
      innerLine: [
        94, 188, 225, 244, 253, 254, 249, 235, 208,
        173, 141, 118, 105, 97, 94, 96, 104, 121, 147,
        183, 224, 265, 302, 333, 358, 375, 388, 395,
        400, 400, 397, 390, 377, 360, 338, 310, 278,
        241, 204, 166, 130, 98, 71, 49, 32, 20, 13, 9,
      ],
      outerLine: this.generateOutlineLineData(),
    };

    this.pieChartValue = 75;
  }



  private outerLinePoints: number[] = [
    85, 71, 59, 50, 45, 42, 41, 44, 58, 88,
    136, 199, 267, 326, 367, 391, 400, 397,
    376, 319, 200, 104, 60, 41, 36, 37, 44,
    55, 74, 100, 131, 159, 180, 193, 199, 200,
    195, 184, 164, 135, 103, 73, 50, 33, 22, 15, 11,
  ];
  private generateOutlineLineData(): OutlineData[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
    const outerLinePointsLength = this.outerLinePoints.length;
    const monthsLength = months.length;

    return this.outerLinePoints.map((p, index) => {
      const monthIndex = Math.round(index / 4);
      const label = (index % Math.round(outerLinePointsLength / monthsLength) === 0)
        ? months[monthIndex]
        : '';

      return {
        label,
        value: p,
      };
    });
  }




  setLegendItems(visitorsLegend): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend.firstIcon,
        title: 'Unique Visitors',
      },
      {
        iconColor: visitorsLegend.secondIcon,
        title: 'Page Views',
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
