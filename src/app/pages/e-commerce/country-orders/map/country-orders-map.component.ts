import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'ngx-country-orders-map',
  styleUrls: ['./country-orders-map.component.scss'],
  template: `
    <div> qqq </div>
  `,
})
export class CountryOrdersMapComponent implements OnDestroy {
  @Input() countryId: string;
  @Output() select: EventEmitter<any> = new EventEmitter();
  alive = true;
  ngOnDestroy(): void {
    this.alive = false;
  }

}
