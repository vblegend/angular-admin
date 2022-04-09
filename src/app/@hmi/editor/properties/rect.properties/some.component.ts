import { Component, Injector } from '@angular/core';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({  // hmi-data-property 
  selector: 'some-selector',
  template: `
    <input type="text" nz-input [ngModel]="searchText"  placeholder="search">
    <input type="text" nz-input [ngModel]="searchText" placeholder="search">
    <nz-select [ngModel]="resultText"  >
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
      <nz-option nzValue="disabled" nzLabel="Disabled"></nz-option>
    </nz-select>
    <button nz-button nzType="primary"  style="width:64px;height:24px;" (click)="click()" >修改</button>
  `,
  styles: [`nz-select{ display:block;width:100%; }  `]
})
// 单向绑定
export class SomeComponent extends BasicPropertyComponent {
  public searchText: string = '1234567';
  public resultText: string = '大夫士大夫';





  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

  }

  public click(): void {
    this.resultText = Math.floor(Math.random() * Number.MAX_VALUE).toFixed();
  }



}
