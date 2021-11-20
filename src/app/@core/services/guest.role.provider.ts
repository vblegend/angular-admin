import { Observable, of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
// import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class GuestRoleProvider {
    public getRole(): Observable<string> {
        return observableOf('guest');
    }
}
