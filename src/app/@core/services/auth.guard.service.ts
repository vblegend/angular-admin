import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetWorkService } from './network.sevrice';
import { SessionService } from './session.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
    private sessionService: SessionService,
    private netWorkService: NetWorkService) {

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
    const userCookie = this.sessionService.get<{ userName: string }>("user");
    if (!this.verifyLoginState(userCookie) || !this.verifyNetWorkState()) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }


  private verifyNetWorkState(): boolean {
    return true;// this.netWorkService.isConnect;
  }

  private verifyLoginState(state: { userName: string }): boolean {
    return state != null && state.userName != null;
  }



}
