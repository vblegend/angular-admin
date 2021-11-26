import { Component, ComponentFactoryResolver, DoCheck, ElementRef, Injector, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationExtras, ParamMap, Params, Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { Location } from '@angular/common';
import { Subscription } from "rxjs";



/**
 * Generic basic components, commonly used services are integrated internally \
 * But the internal methods and properties are protected 
 */
@Component({
    selector: 'ngx-generic-component',
    template: '<ng-container #view></ng-container>'
})
export abstract class GenericComponent implements OnInit, OnDestroy {
    @ViewChild("view", { read: ViewContainerRef }) view: ViewContainerRef;
    // private hostElement: ElementRef<GenericComponent>;
    // private componentFactoryResolver: ComponentFactoryResolver;

    private _queryParams: ParamMap;
    private _routeSubscription: Subscription;
    protected readonly activatedRoute: ActivatedRoute;

    /**
     * get common service
     * @returns 
     */
    protected readonly commonService: CommonService;
    protected readonly location: Location;
    protected readonly zone: NgZone;
    protected readonly router: Router


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
    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.commonService = injector.get(CommonService);
        this.location = injector.get(Location);
        this.zone = injector.get(NgZone);
        this.router = injector.get(Router);
        // this.hostElement = injector.get(ElementRef); 
        // this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
        // this.view.createComponent()
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory();
        // return componentFactory.inputs;
        // this.hostElement
        this._routeSubscription = this.activatedRoute.paramMap.subscribe((params) => {
            const frist = this.queryParams == null;
            this._queryParams = params;
            if (!frist) this.onQueryChanges();
        });
    }

    /**
     * This event is triggered when the current component routing request parameter changes, and will not affect the parent routing
     * @queryParams route request parameters 
     */
    protected onQueryChanges(): void {

    }


    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     * @param fn 
     * @returns 
     */
    protected runOut<T>(fn: (...args: any[]) => T): T {
        return this.zone.runOutsideAngular(fn);
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
        return this.zone.run(fn, applyThis, applyArgs);
    }

    /**
     * Asynchronous thread sleep function 
     * @param milliseconds sleep time in milliseconds  
     * @returns 
     */
    public async sleep(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            window.setTimeout(resolve, milliseconds);
        });
    }

    /**
     * navigate to the specified routing address
     * @param routePaths 
     * @returns 
     */
    public navigate(routePaths: string, extras?: NavigationExtras): Promise<boolean> {
        return this.router.navigate([routePaths], extras);
    }

    /**
     * Navigates back in the platform's history.
     */
    public goBack(): void {
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
    public navigateByUrl(routeUrl: string, queryParams?: Params): Promise<boolean> {
        if (queryParams) {
            return this.router.navigate([routeUrl], { queryParams: queryParams });
        } else {
            return this.router.navigateByUrl(routeUrl);
        }
    }


    /**
     * 一个生命周期钩子，它会在 Angular 初始化完了该指令的所有数据绑定属性之后调用。 定义 ngOnInit() 方法可以处理所有附加的初始化任务。\
     * 它的调用时机在默认的变更检测器首次检查完该指令的所有数据绑定属性之后，任何子视图或投影内容检查完之前。 它会且只会在指令初始化时调用一次。
     */
    public ngOnInit(): void {
        this.onInit();
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


    /**
     * 一个生命周期钩子，它会在指令、管道或服务被销毁时调用。 用于在实例被销毁时，执行一些自定义清理代码。
     */
    public ngOnDestroy(): void {
        if (this._routeSubscription) {
            this._routeSubscription.unsubscribe();
        }
        this.onDestroy();
    }
}