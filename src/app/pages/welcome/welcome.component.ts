import { Component, Injector, OnInit } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent extends GenericComponent {
  public id: string;
  public name: string = null;
  constructor(injector: Injector) {
    super(injector)
  }

  protected onQueryChanges() {

    this.id = this.queryParams.get('id');
    console.log(`app-welcome onRouter ${this.id}`);
  }

  protected onInit() {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome onInit ${this.id}`);
  }

  protected onDestroy() {
    console.log(`app-welcome onDestroy`);
  }



}
