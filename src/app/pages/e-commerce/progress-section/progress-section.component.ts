import { Component, OnDestroy } from '@angular/core';

export interface ProgressInfo {
  title: string;
  value: number;
  activeProgress: number;
  description: string;
}
@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor() {
    this.progressInfoData = [
      {
        title: 'Today’s Profit',
        value: 572900,
        activeProgress: 70,
        description: 'Better than last week (70%)',
      },
      {
        title: 'New Orders',
        value: 6378,
        activeProgress: 30,
        description: 'Better than last week (30%)',
      },
      {
        title: 'New Comments',
        value: 200,
        activeProgress: 55,
        description: 'Better than last week (55%)',
      },
    ];
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
