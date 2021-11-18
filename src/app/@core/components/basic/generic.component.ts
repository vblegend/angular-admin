import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../services/common.service";

@Component({
    selector: 'ngx-generic-component',
    template: '<i>123</i>'
})
export abstract class GenericComponent implements OnInit, OnDestroy, OnChanges, DoCheck {

    /**
     *
     */
    constructor(protected commonService: CommonService,) {

    }




    /**
     * 一个生命周期钩子，它会在 Angular 初始化完了该指令的所有数据绑定属性之后调用。 定义 ngOnInit() 方法可以处理所有附加的初始化任务。\
     * 它的调用时机在默认的变更检测器首次检查完该指令的所有数据绑定属性之后，任何子视图或投影内容检查完之前。 它会且只会在指令初始化时调用一次。
     */
    public ngOnInit(): void {

    }

    /**
     * 一个生命周期钩子，当指令的任何一个可绑定属性发生变化时调用。 定义一个 ngOnChanges() 方法来处理这些变更\
     * 如果至少发生了一次变更，则该回调方法会在默认的变更检测器检查完可绑定属性之后、视图子节点和内容子节点检查完之前调用。
     * @param changes 
     */
    public ngOnChanges(changes: SimpleChanges): void {

    }

    /**
     * 一个生命周期钩子，除了使用默认的变更检查器执行检查之外，还会为指令执行自定义的变更检测函数。\
     * 在变更检测期间，默认的变更检测算法会根据引用来比较可绑定属性，以查找差异。 你可以使用此钩子来用其他方式检查和响应变更。
     */
    public ngDoCheck(): void {

    }




    /**
     * 一个生命周期钩子，它会在指令、管道或服务被销毁时调用。 用于在实例被销毁时，执行一些自定义清理代码。
     */
    public ngOnDestroy(): void {

    }
}