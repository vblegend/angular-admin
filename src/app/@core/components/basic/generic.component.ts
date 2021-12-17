import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, DoCheck, ElementRef, EventEmitter, Injector, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationExtras, ParamMap, Params, Router } from "@angular/router";
import { Location } from '@angular/common';
import { Observable, Subject, Subscription } from "rxjs";
import { Exception } from "@core/common/exception";
import { FixedTimer, FixedTimerHandler } from "@core/common/fixedtimer";
import { TemplateService } from "@core/services/template.service";
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { NzModalService } from "ng-zorro-antd/modal";
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageDataOptions, NzMessageService } from "ng-zorro-antd/message";
import { MessageType } from "@core/common/messagetype";
import { SessionService } from "@core/services/session.service";
import { CacheService } from "@core/services/cache.service";

/**
 * Generic basic components, commonly used services are integrated internally \
 * But the internal methods and properties are protected 
 */
@Component({
    selector: 'ngx-generic-component',
    template: '<ng-container #view></ng-container>'
})
export abstract class GenericComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('view', { read: ViewContainerRef }) view: ViewContainerRef;

    private _times: FixedTimer[];
    private _isDispose: boolean;
    private _queryParams: ParamMap;
    private _subscriptions: Subscription[];
    /**
     * get common service
     * @returns 
     */
    protected readonly cacheService: CacheService;
    protected readonly componentFactoryResolver: ComponentFactoryResolver;
    protected readonly sessionService: SessionService;
    protected readonly activatedRoute: ActivatedRoute;
    protected readonly messageService: NzMessageService;
    protected readonly location: Location;
    protected readonly zone: NgZone;
    protected readonly router: Router
    protected readonly templateService: TemplateService;
    protected readonly changeDetector: ChangeDetectorRef;
    protected readonly modalService: NzModalService;
    protected readonly drawerService: NzDrawerService;
    protected readonly overlay: Overlay;
    protected readonly viewContainerRef: ViewContainerRef;
    /**
     * get current route request parameters \
     * do not cache the variable 
     */
    protected get queryParams(): ParamMap {
        return this._queryParams;
    }

    /**
     *
     */
    constructor(private injector: Injector) {
        this._isDispose = false;
        this._times = [];
        this._subscriptions = [];
        this.activatedRoute = injector.get(ActivatedRoute);
        this.location = injector.get(Location);
        this.zone = injector.get(NgZone);
        this.router = injector.get(Router);
        this.overlay = injector.get(Overlay);
        this.templateService = injector.get(TemplateService);
        this.changeDetector = injector.get(ChangeDetectorRef);
        this.modalService = injector.get(NzModalService);
        this.drawerService = injector.get(NzDrawerService);
        this.viewContainerRef = injector.get(ViewContainerRef);
        this.messageService = injector.get(NzMessageService);
        this.sessionService = injector.get(SessionService);
        this.cacheService = injector.get(CacheService);
        this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
        this.subscribe(this.activatedRoute.paramMap, this.route_updateParam);
    }


    private route_updateParam(params: ParamMap) {
        const frist = this.queryParams == null;
        this._queryParams = params;
        if (!frist) this.onQueryChanges();
    }


    /**
     * 更改检测树相关
     */
    protected attachView() {
        this.ifDisposeThrowException();
        this.changeDetector.reattach();
    }

    protected detachView() {
        this.ifDisposeThrowException();
        this.changeDetector.detach();
    }

    protected detectChanges() {
        this.ifDisposeThrowException();
        this.changeDetector.detectChanges();
    }

    /**
     * This event is triggered when the current component routing request parameter changes, and will not affect the parent routing
     * @queryParams route request parameters 
     */
    protected onQueryChanges(): void {

    }

    /**
     * 
     * @param target 
     * @param next 
     * @param once 
     * @returns 
     */
    protected subscribe<T>(target: Observable<T> | EventEmitter<T> | Subject<T>, next?: (value: T) => void, once?: boolean): Subscription {
        const that = this as Object;
        this.ifDisposeThrowException();
        const subscription: Subscription = target.subscribe((value) => {
            next.apply(that, [value]);
            if (once) {
                this.unsubscribe(subscription);
            }
        });
        this._subscriptions.push(subscription);
        return subscription;
    }


    private unsubscribe(sub: Subscription): void {
        const index = this._subscriptions.indexOf(sub);
        if (index > -1) {
            this._subscriptions.splice(index, 1);
            if (sub.closed != true) {
                sub.unsubscribe();
            }
        }
        // {{{{{{}}}}}}
        // [[[[[[]]]]]]
    }


    /**
     * 
     * @param ctor  
     * @returns 
     */
    protected generateComponent<T>(ctor: ComponentType<T>): ComponentRef<T> {
        this.ifDisposeThrowException();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ctor);
        const componentRef = this.viewContainerRef.createComponent<T>(componentFactory, null, this.injector);
        return componentRef;
    }


    /**
     * 
     * @param ctor 
     * @returns 
     */
    protected generateOverlayComponent<T>(ctor: ComponentType<T>): ComponentRef<T> {
        this.ifDisposeThrowException();
        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(ctor, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        return componentRef;
    }



    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     * @param fn 
     * @returns 
     */
    protected runOut<T>(fn: (...args: any[]) => T, thisContext?: Object): T {
        this.ifDisposeThrowException();
        return this.zone.runOutsideAngular(thisContext ? fn.bind(thisContext) : fn);
    }

    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     * @param fn 
     * @param applyThis 
     * @param applyArgs 
     * @returns T
     */
    protected run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
        this.ifDisposeThrowException();
        return this.zone.run(fn, applyThis, applyArgs);
    }


    protected createTimer(handler: FixedTimerHandler): FixedTimer {
        this.ifDisposeThrowException();
        return new FixedTimer(handler, this.timer_onstart, this.timer_onstop, this);
    }

    private timer_onstart(timer: FixedTimer) {
        this._times.push(timer);
    }

    private timer_onstop(timer: FixedTimer) {
        const index = this._times.indexOf(timer);
        if (index > -1) {
            this._times.splice(index, 1);
        }
    }

    /**
     * Asynchronous thread sleep function 
     * @param milliseconds sleep time in milliseconds  
     * @returns 
     */
    public async sleep(milliseconds: number): Promise<void> {
        this.ifDisposeThrowException();
        return new Promise((resolve) => {
            window.setTimeout(resolve, milliseconds);
        });
    }


    public get tickCount(): number {
        return (typeof performance === 'undefined' ? Date : performance).now();
    }


    /**
     * show global message
     * @param message text message
     * @param type Message Type
     * @param options Message Data Options
     */
    public showMessage(message: string, type: MessageType, options?: NzMessageDataOptions): void {
        this.messageService.create(type, message, options);
    }


    /**
     * Open a drawer that cannot be mask closable 
     * @param options 
     * @returns 
     */
    public openDrawer<TDrawer, TInput, TOut>(options: NzDrawerOptions<TDrawer, { input: TInput }>): NzDrawerRef<TDrawer, TOut> {
        this.ifDisposeThrowException();
        options.nzMaskClosable = false;
        return this.drawerService.create(options);
    }

    /**
     * waiting for a drawer to close 
     * @param drawerRef 
     * @returns 
     */
    public async waitDrawer<TDrawer = NzSafeAny, TOut = NzSafeAny>(drawerRef: NzDrawerRef<TDrawer, TOut>): Promise<TOut> {
        this.ifDisposeThrowException();
        return new Promise<TOut>((resolve) => {
            drawerRef.afterClose.subscribe(resolve);
        });
    }







    /**
     * navigate to the specified routing address
     * @param routePaths 
     * @returns 
     */
    public async navigate(routePaths: string, extras?: NavigationExtras): Promise<boolean> {
        this.ifDisposeThrowException();
        return this.router.navigate([routePaths], extras);
    }

    /**
     * Navigates back in the platform's history.
     */
    public goBack(): void {
        this.ifDisposeThrowException();
        this.location.back();
    }


    /**
     * navigate to the specified routing address
     * `this.navigateByUrl('/results');`
     * `this.navigateByUrl('/results', { page: 1 });`
     * @param routeUrl Route address
     * @param queryParams Route request parameters 
     * @returns 
     */
    public async navigateByUrl(routeUrl: string, queryParams?: Params): Promise<boolean> {
        this.ifDisposeThrowException();
        if (queryParams) {
            return this.router.navigate([routeUrl], { queryParams: queryParams });
        } else {
            return this.router.navigateByUrl(routeUrl);
        }
    }


    /**
     * 一个生命周期钩子，当指令的任何一个可绑定属性发生变化时调用。 定义一个 ngOnChanges() 方法来处理这些变更\
     * 如果至少发生了一次变更，则该回调方法会在默认的变更检测器检查完可绑定属性之后、视图子节点和内容子节点检查完之前调用。
     * @param changes 
     */
    // public ngOnChanges(changes: SimpleChanges): void {

    // }

    /**
     * 一个生命周期钩子，除了使用默认的变更检查器执行检查之外，还会为指令执行自定义的变更检测函数。\
     * 在变更检测期间，默认的变更检测算法会根据引用来比较可绑定属性，以查找差异。 你可以使用此钩子来用其他方式检查和响应变更。
     */
    // public ngDoCheck(): void {

    // }

    protected onInit(): void {

    }

    protected onDestroy(): void {

    }

    protected onAfterViewInit(): void {

    }

    protected ifDisposeThrowException() {
        if (this._isDispose) {
            throw Exception.build(`${typeof this} has been destroyed.`, 'cannot continue to operate components that have been destroyed.');
        }
    }

    /**
     * 
     */
    public get IsDispose(): boolean {
        return this._isDispose;
    }



    /**
     * 一个生命周期钩子，它会在 Angular 初始化完了该指令的所有数据绑定属性之后调用。 定义 ngOnInit() 方法可以处理所有附加的初始化任务。\
     * 它的调用时机在默认的变更检测器首次检查完该指令的所有数据绑定属性之后，任何子视图或投影内容检查完之前。 它会且只会在指令初始化时调用一次。
     */
    public ngOnInit(): void {
        this.onInit();
    }


    /**
     * 
     */
    public ngAfterViewInit(): void {
        this.onAfterViewInit();
    }

    /**
     * 一个生命周期钩子，它会在指令、管道或服务被销毁时调用。 用于在实例被销毁时，执行一些自定义清理代码。
     */
    public ngOnDestroy(): void {
        if (this._isDispose) return;
        while (this._times.length) {
            this._times[0].stop();
        }
        while (this._subscriptions.length) {
            this.unsubscribe(this._subscriptions[0]);
        }
        this._isDispose = true;
        this.onDestroy();
    }
}