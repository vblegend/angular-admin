import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterState, RouterStateSnapshot, RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RouteTitle } from '../models/RouteTitle';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentTitleService {

    private subscription: Subscription;
    private _defaultTitle: RouteTitle;
    private _globalSuffix: RouteTitle;
    private _globalPrefix: RouteTitle;

    constructor(private router: Router,
        public titleService: Title) {

    }

    public get defaultTitle(): RouteTitle {
        return this._defaultTitle;
    }

    public set defaultTitle(value: RouteTitle) {
        this._defaultTitle = value;
    }

    /**
     * get/set global title suffix
     */
    public get globalSuffix(): RouteTitle {
        return this._globalSuffix;
    }

    public set globalSuffix(value: RouteTitle) {
        this._globalSuffix = value;
    }

    /**
     * get/set global title prefix
     */
    public get globalPrefix(): RouteTitle {
        return this._globalPrefix;
    }

    public set globalPrefix(value: RouteTitle) {
        this._globalPrefix = value;
    }

    /**
     * load page default title from router
     */
    public register(): void {
        if (this.subscription == null) {
            this.subscription = this.router.events.subscribe(this.router_event.bind(this));
        }
    }


    public unRegister(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private router_event(event: RouterEvent) {
        if (event instanceof NavigationEnd) {
            let title = this.getCurrentTitle(this.router);
            if (title == null) title = this._defaultTitle;
            const suffixText = this.getTitleText(this._globalSuffix);
            const titleText = this.getTitleText(title);
            const prefixText = this.getTitleText(this._globalPrefix);
            this.titleService.setTitle(suffixText + titleText + prefixText);
        }
    }


    private getTitleText(title: RouteTitle): string {
        let value: string = '';
        if (title != null) {
            value = title.value;
            if (title.needsTranslator) {
                value = value + '...';
            }
        }
        return value;
    }



    private getCurrentTitle(router: Router): RouteTitle {
        let title: RouteTitle = null;
        const state: RouterState = this.router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        let node = snapshot.root;
        while (node != null) {
            if (node.routeConfig) {
                title = node.routeConfig.title;
            }
            node = node.firstChild;
        }
        return title;
    }




}