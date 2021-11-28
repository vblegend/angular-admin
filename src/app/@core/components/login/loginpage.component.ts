import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { MessageType } from '../../common/messagetype';
// import { NbAuthService } from '@nebular/auth';

import { GenericComponent } from '../basic/generic.component';


@Component({
  selector: 'ngx-login',
  styleUrls: ['./loginpage.component.less'],
  templateUrl: './loginpage.component.html',
})
export class LoginPageComponent extends GenericComponent {
  public background: string;
  public password: string;
  public loadingWait: boolean;
  constructor(injector: Injector) {
    super(injector);
    this.password = '';
    this.background = 'url(/assets/images/team.png)';
  }

  protected onInit() {
    console.log(`on init login`);
    console.log(this.queryParams.get('name'));
  }


  protected onQueryChanges() {
    console.log(`on query login`);
  }


  public login(): void {
    if (this.password.length == 0) {
      this.commonService.showMessage("Please input your Password!", MessageType.Error);
      return;
    }

    if (this.loadingWait) return;
    this.loadingWait = true;
    this.commonService.showMessage("login successful.", MessageType.Success);
    this.commonService.sleep(1000).then(() => {
      this.commonService.session.set('user', { userName: '姑嘚423^$%#12f阀手动阀3' });
      this.commonService.navigate('/');
    });
    // this.accountService.login(this.password).then(e => {
    //   console.log(e);
    // });
    this.createTimer(() => {
      this.loadingWait = false;
    }).start(3000);

  }
}
