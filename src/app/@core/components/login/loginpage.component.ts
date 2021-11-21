import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '../../common/messagetype';
// import { NbAuthService } from '@nebular/auth';
import { AccountService } from '../../services/account.service';
import { CommonService } from '../../services/common.service';
import { NetWorkService } from '../../services/network.sevrice';
import { GenericComponent } from '../basic/generic.component';


@Component({
  selector: 'ngx-login',
  styleUrls: ['./loginpage.component.scss'],
  templateUrl: './loginpage.component.html',
})
export class LoginPageComponent extends GenericComponent {

  public password: string;
  public loadingWait: boolean;
  constructor(
    protected accountService: AccountService,
    protected commonService: CommonService,
    // @Inject(NB_AUTH_OPTIONS) protected options = {},
    // protected cd: ChangeDetectorRef,
    public netWorkService: NetWorkService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
    super(commonService);
    this.password = '';
  }

  ngOnInit(): void {

  }


  public login(): void {
    if (this.password.length == 0) {
      this.commonService.showMessage("Please input your Password!", MessageType.Error);
      return;
    }

    if (this.loadingWait) return;
    this.loadingWait = true;
    this.commonService.showMessage("密码错误。", MessageType.Error);
    this.commonService.sleep(1000).then(() => {
      this.commonService.session.set('user', { userName: '姑嘚423^$%#12f阀手动阀3' });
      this.commonService.navigate('/');
    });
    // this.accountService.login(this.password).then(e => {
    //   console.log(e);
    // });
    window.setTimeout(() => {
      this.loadingWait = false;
    }, 3000);
  }
}
