import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { map, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { CommonService } from './common.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: NbAuthService, public commonService: CommonService) {

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
    if (userCookie && userCookie.userName) {
      return true;
    } else {
      this.commonService.navigateByUrl('/login');
      return false;
    }
  }
}
