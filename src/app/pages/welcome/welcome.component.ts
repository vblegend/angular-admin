import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GenericComponent } from '../../@core/components/basic/generic.component';
import { CommonService } from '../../@core/services/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends GenericComponent {

  public name: string = null;
  constructor(protected activatedRoute: ActivatedRoute, protected commonService: CommonService, protected location: Location = null) {
    super(activatedRoute, commonService, location)
  }

  protected onRouter() {
    console.log(`app-welcome onRouter ${this.queryParams.get('id')}`);
  }

  public ngOnInit(){
    console.log(`app-welcome ngOnInit ${this.queryParams.get('id')}`);
  }

  protected onDestroy() {
    console.log(`app-welcome onDestroy`);
  }
  // public ngOnInit() {

  //   super.ngOnInit();
  // }


}
