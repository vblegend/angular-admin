import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
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
@Component({
  selector: 'ngx-traffic-front-card',
  styleUrls: ['./traffic-front-card.component.scss'],
  templateUrl: './traffic-front-card.component.html',
})
export class TrafficFrontCardComponent implements OnDestroy {

  private alive = true;

  @Input() frontCardData: TrafficList;

  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  trackByDate(_, item) {
    return item.date;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
