import { Component, Injector, Input, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { GenericComponent } from '../basic/generic.component';

@Component({
  selector: 'ngx-collapse',
  templateUrl: './ngx.collapse.component.html',
  styleUrls: ['./ngx.collapse.component.less']
})
export class CollapseComponent extends GenericComponent {

  @Input() expanded = false;
  @Input() header = 'ngx-collapse';

  constructor(protected injector: Injector) {
    super(injector);
  }

  public header_click(): void {
    this.expanded = !this.expanded
    // this.detectChanges();
  }

}