import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SessionManager } from '../common/sessionmanager';
import { RouteTitle } from '../models/RouteTitle';
import { NzMessageDataOptions, NzMessageService } from 'ng-zorro-antd/message';
import { MessageType } from '../common/messagetype';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private _sessionManager: SessionManager;

    constructor(private router: Router,
        private message: NzMessageService,
        public titleService: Title) {
        this._sessionManager = new SessionManager();
    }

    public get tickCount(): number {
        return (typeof performance === 'undefined' ? Date : performance).now();
    }


    /**
     * sleep for promise
     * @param milliseconds 
     * @returns 
     */
    public async sleep(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            window.setTimeout(resolve, milliseconds);
        });
    }


    /**
     * get app sessionManager
     */
    public get session(): SessionManager {
        return this._sessionManager;
    }


    /**
     * router navigate
     * @param routePaths 
     * @returns 
     */
    public navigate(...routePaths: string[]): Promise<boolean> {
        return this.router.navigate(routePaths);
    }

    /**
     * router navigate
     * @param routePaths 
     * @returns 
     */
    public navigateByUrl(routeUrl: string): Promise<boolean> {
        return this.router.navigateByUrl(routeUrl);
    }




    /**
     * show global message
     * @param message text message
     * @param type Message Type
     * @param options Message Data Options
     */
    public showMessage(message: string, type: MessageType, options?: NzMessageDataOptions): void {
        this.message.create(type, message, options);
    }





}