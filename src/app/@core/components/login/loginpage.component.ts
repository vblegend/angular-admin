import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { AccountService } from '../../services/account.service';
import { CommonService } from '../../services/common.service';
import { GenericComponent } from '../basic/generic.component';


@Component({
  selector: 'ngx-login',
  styleUrls: ['./loginpage.component.scss'],
  templateUrl: './loginpage.component.html',
})
export class LoginPageComponent extends GenericComponent {
  public password: string;
  public loadingWait: boolean;
  constructor(protected service: NbAuthService,
    protected accountService: AccountService,
    protected commonService: CommonService,
    // @Inject(NB_AUTH_OPTIONS) protected options = {},
    // protected cd: ChangeDetectorRef,
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
    super(commonService);
  }

  public login(): void {
    if (this.loadingWait) return;
    this.loadingWait = true;
    this.commonService.toastr("密码错误。", "登录失败", { status: "danger", hasIcon: true, icon: { icon: "warning1", pack: "grace" } });
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
