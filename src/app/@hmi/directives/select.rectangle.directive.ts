import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, ComponentRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { BaseDirective } from '@core/directives/base.directive';
import { SelectionComponent } from '@hmi/components/selection/selection.component';
import { Rectangle } from '@hmi/core/common';
import { EditorComponent } from '@hmi/editor.component';
import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[selectRectangle]'
})

export class SelectRectangleDirective extends BaseDirective {
    @Input() editor: EditorComponent;

    private rectComponent: ComponentRef<SelectionComponent>;
    private buttonDown = false;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(protected injector: Injector) {
        super(injector);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<SelectionComponent>(SelectionComponent);
        this.rectComponent = this.viewContainerRef.createComponent<SelectionComponent>(componentFactory, null, this.injector);
        this.rectComponent.hostView.detach();
    }

    public onInit(): void {

    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.buttonDown = true;
            this.element.style.cursor = 'crosshair';
            this.startX = ev.clientX - this.element.offsetLeft;
            this.startY = ev.clientY - this.element.offsetTop;
            // 创建矩形对象。。。。。。。
            // 当框选模式时禁止其他组件改变鼠标样式
            // 鼠标缩放定位问题
            this.viewContainerRef.insert(this.rectComponent.hostView);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    @HostListener('mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.endX = ev.clientX - this.element.offsetLeft;
            this.endY = ev.clientY - this.element.offsetTop;
            const left = Math.min(this.endX, this.startX);
            const top = Math.min(this.endY, this.startY);
            const width = Math.abs(this.endX - this.startX)
            const height = Math.abs(this.endY - this.startY)
            this.updateSelectionArea({ left, top, width, height });
            ev.preventDefault();
        }
    }


    private updateSelectionArea(rect: Rectangle) {

        this.rectComponent.instance.rect = rect;
        const children = this.editor.canvas.children;
        for (let i = 0; i < children.length; i++) {
            const viewRef = children[i];
            const dest = viewRef.instance.config.rect;

            console.log(`${dest.left},${dest.top},${dest.width},${dest.height}         ${rect.left},${rect.top},${rect.width},${rect.height}`)
            if (this.checkRectangleCross(viewRef.instance.config.rect, rect)) {
                // viewRef.instance.isSelected = true;
                // console.log(viewRef.instance);
            }
        }

    }




    public checkRectangleCross(rect1: Rectangle, rect2: Rectangle): boolean {
        const isTrue = rect1.left + rect1.width >= rect2.left && // 矩形 2 左边界
            rect1.left <= rect2.left + rect2.width && // 矩形 2 右边界
            rect1.top + rect1.height >= rect2.top && // 矩形 2 上边界
            rect1.top <= rect2.top + rect2.height; // 矩形 2 下边界
        if (isTrue) {
            return true; // 发生碰撞
        } else {
            return false; // 没有碰撞
        }
    }



    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.element.style.cursor = '';
            this.buttonDown = false;
            const index = this.viewContainerRef.indexOf(this.rectComponent.hostView);
            if (index >= 0) {
                this.viewContainerRef.detach(index);
            }
            this.rectComponent.instance.rect = { left: 0, top: 0, width: 0, height: 0 };
            ev.preventDefault();
        }
    }

}