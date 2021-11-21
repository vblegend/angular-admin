import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { map, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { NbAuthService } from '@nebular/auth';
import { CommonService } from './common.service';
import { NetWorkService } from './network.sevrice';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public commonService: CommonService, private netWorkService: NetWorkService) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   return this.authService.isAuthenticated().toPromise();
    // return this.authService.isAuthenticated()
    //   .pipe(
    //     map(authenticated => {
    //       if (!authenticated) {
    //         this.router.navigate(['/password']);
    //       }
    //       return authenticated;
    //     })
    //   );

    const userCookie = this.commonService.session.get<{ userName: string }>("user");
    if (!this.verifyLoginState(userCookie) || !this.verifyNetWorkState()) {
      this.commonService.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }


  private verifyNetWorkState(): boolean {
    return this.netWorkService.isConnect;
  }

  private verifyLoginState(state: { userName: string }): boolean {
    return state != null && state.userName != null;
  }



}
