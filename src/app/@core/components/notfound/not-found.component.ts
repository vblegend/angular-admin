import { Component, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { GenericComponent } from '../basic/generic.component';


@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent extends GenericComponent {

  constructor(injector: Injector) {
    super(injector);
  }



  
}
