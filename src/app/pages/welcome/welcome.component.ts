import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GenericComponent } from '../../@core/components/basic/generic.component';
import { CommonService } from '../../@core/services/common.service';
import { Location } from '@angular/common';

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

    const result = this.runOut(this.sum).then(e => {
      console.log(e);
    });


  }





  private async sum(): Promise<number> {
    return new Promise((resolver) => {
      window.setTimeout(() => {
        resolver(103);
      }, 500);
    });
  }



  public ngOnInit() {
    this.id = this.queryParams.get('id');
    console.log(`app-welcome ngOnInit ${this.id}`);
  }

  protected onDestroy() {
    console.log(`app-welcome onDestroy`);
  }
  // public ngOnInit() {

  //   super.ngOnInit();
  // }


}
