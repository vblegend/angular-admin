import { Component, Injector, OnInit } from '@angular/core';
import { GenericComponent } from '../basic/generic.component';

@Component({
  selector: 'ngx-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends GenericComponent {

  constructor(injector: Injector) {
    super(injector);
  }

}
