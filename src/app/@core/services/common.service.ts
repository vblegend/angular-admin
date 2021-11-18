import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter } from "rxjs/operators";
import { NbThemeService, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { SessionManager } from '../common/sessionmanager';
import { RouteTitle } from '../models/RouteTitle';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private _sessionManager: SessionManager;

    constructor(private router: Router,
        public activatedRoute: ActivatedRoute,
        public toastrService: NbToastrService,
        public themeService: NbThemeService,
        public titleService: Title) {
        this._sessionManager = new SessionManager();
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
     * show toastr dialog
     * @param message 
     * @param title 
     * @param userConfig 
     */
    public toastr(message: any, title?: any, userConfig?: Partial<NbToastrConfig>): void {
        this.toastrService.show(message, title, userConfig)
    }

}