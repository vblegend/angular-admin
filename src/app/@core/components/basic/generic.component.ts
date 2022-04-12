import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, DoCheck, ElementRef, EventEmitter, Injector, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationExtras, ParamMap, Params, Router } from "@angular/router";
import { Location } from '@angular/common';
import { Observable, Subject, Subscription } from "rxjs";
import { Exception } from "@core/common/exception";
import { FixedTimer, FixedTimerHandler } from "@core/common/fixedtimer";
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { NzModalService } from "ng-zorro-antd/modal";
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from "ng-zorro-antd/drawer";
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageDataOptions, NzMessageService } from "ng-zorro-antd/message";
import { MessageType } from "@core/common/messagetype";
import { SessionService } from "@core/services/session.service";
import { CacheService } from "@core/services/cache.service";
import { NzContextMenuService } from "ng-zorro-antd/dropdown";
import { Action } from "@core/common/delegate";
import { AnyObject } from "@core/common/types";
import { Sealed } from "@core/decorators/sealed";
import { EventBusService } from "@core/services/event.bus.service";



/**
 * Generic basic components, commonly used services are integrated internally \
 * But the internal methods and properties are protected 
 */
@Component({
    selector: 'ngx-generic-component',
    template: '<ng-container #view></ng-container>'
})
export abstract class GenericComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('view', { read: ViewContainerRef })
    public view?: ViewContainerRef;

    private _times: FixedTimer[];
    private _isDispose: boolean;
    private _queryParams?: ParamMap;
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
    protected readonly changeDetector: ChangeDetectorRef;
    protected readonly modalService: NzModalService;
    protected readonly drawerService: NzDrawerService;
    protected readonly contextMenuService: NzContextMenuService;
    protected readonly overlay: Overlay;
    public readonly viewContainerRef: ViewContainerRef;
    protected readonly eventBusService: EventBusService;


    /**
     * get current route request parameters \
     * do not cache the variable 
     */
    protected get queryParams(): ParamMap {
        return this._queryParams!;
    }

    /**
     *
     */
    constructor(protected injector: Injector) {
        this._isDispose = false;
        this._times = [];
        this._subscriptions = [];
        this.activatedRoute = injector.get(ActivatedRoute);
        this.location = injector.get(Location);
        this.zone = injector.get(NgZone);
        this.router = injector.get(Router);
        this.overlay = injector.get(Overlay);
        this.changeDetector = injector.get(ChangeDetectorRef);
        this.modalService = injector.get(NzModalService);
        this.drawerService = injector.get(NzDrawerService);
        this.viewContainerRef = injector.get(ViewContainerRef);
        this.messageService = injector.get(NzMessageService);
        this.sessionService = injector.get(SessionService);
        this.cacheService = injector.get(CacheService);
        this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
        this.contextMenuService = injector.get(NzContextMenuService);
        this.eventBusService = injector.get(EventBusService);
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
            next!.apply(that, [value]);
            if (once) {
                this.unsubscribe(subscription);
            }
        });
        this._subscriptions.push(subscription);
        return subscription;
    }

    /**
     * 托管一个订阅对象，等对象销毁时取消订阅
     * @param subscription 
     */
    protected managedSubscription(subscription: Subscription): void {
        this.ifDisposeThrowException();
        if (this._subscriptions.indexOf(subscription) === -1) {
            this._subscriptions.push(subscription);
        }
    }

    private unsubscribe(sub: Subscription): void {
        const index = this._subscriptions.indexOf(sub);
        if (index > -1) {
            this._subscriptions.splice(index, 1);
            if (sub.closed != true) {
                sub.unsubscribe();
            }
        }
    }


    /**
     * 
     * @param ctor  
     * @returns 
     */
    public generateComponent<T>(ctor: ComponentType<T>): ComponentRef<T> {
        this.ifDisposeThrowException();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ctor);
        const componentRef = this.viewContainerRef.createComponent<T>(componentFactory, undefined, this.injector);
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



    /**
     * 组件异常事件
     * @param location 发生位置
     * @param ex 异常问题
     */
    protected onError(location: string, ex: any) {
        console.error(`${location}=> ${ex}`);
    }

    /**
     * 组件的初始化事件[生命周期开始]\
     * 用于组件加载后的数据初始化\
     * 本方法已 no catch ，方法内触发catch不影响主逻辑
     */
    protected onInit(): void {

    }

    /**
     * 组件的销毁事件[生命周期结束]\
     * 用于组件内数据的销毁操作\
     * 本方法已 no catch ，方法内触发catch不影响主逻辑\
     * 为保证数据释放重写本方法请在首行调用{super.onDestroy();}
     */
    protected onDestroy(): void {

    }


    /**
     * 组件附加至容器后触发\
     * 本方法已 no catch ，方法内触发catch不影响主逻辑\
     */
    protected onAfterViewInit(): void {

    }

    /**
     * 如果当前组件已被销毁，则抛出一个异常信息。
     */
    protected ifDisposeThrowException() {
        if (this._isDispose) {
            throw Exception.build(`${typeof this} has been destroyed.`, 'cannot continue to operate components that have been destroyed.');
        }
    }

    /**
     * 当前组件释放已被销毁
     */
    public get IsDispose(): boolean {
        return this._isDispose;
    }



    /**
     * 组件的初始化事件\
     * 禁止子类重写该方法请使用 @onInit
     */
    @Sealed()
    public ngOnInit(): void {
        try {
            this.onInit();
        } catch (ex) {
            console.warn(ex);
            this.callMethodNoCatch(this.onError, 'onInit', ex);
        }
    }



    /**
     * 安全调用一个方法，屏蔽掉方法内所有可能出现的catch
     * @param method 
     */
    protected callMethodNoCatch(method: Action, ...params: any[]) {
        try {
            if (method) method.apply(this, params);
        }
        catch (e) {
            console.warn(e);
        }
    }


    /**
     * 
     */
    @Sealed()
    public ngAfterViewInit(): void {
        this.callMethodNoCatch(this.onAfterViewInit);
    }

    /**
     * 组件的销毁事件
     * 禁止子类重写该方法请使用 @onDestroy
     */
    @Sealed()
    public ngOnDestroy(): void {
        if (this._isDispose) return;
        while (this._times.length) {
            this._times[0].stop();
        }
        while (this._subscriptions.length) {
            this.unsubscribe(this._subscriptions[0]);
        }
        this._isDispose = true;
        try {
            this.onDestroy();
        } catch (ex) {
            console.warn(ex);
            this.callMethodNoCatch(this.onError, 'onDestroy', ex);
        }


    }
}