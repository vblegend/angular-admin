import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional, ViewContainerRef, ViewRef, ComponentRef } from '@angular/core';
import { SelectionComponent } from '@hmi/components/selection/selection.component';
import { AgentComponent } from '../components/agent/agent.component';

@Directive({
    selector: '[selectRectangle]'
})

export class SelectRectangleDirective implements OnInit {
    @Input() host: AgentComponent;
    private element: HTMLElement = null;
    private rectComponent: ComponentRef<SelectionComponent>;
    private buttonDown = false;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.element = this.el.nativeElement;
        this.rectComponent = viewContainerRef.createComponent<SelectionComponent>(SelectionComponent);
        this.rectComponent.hostView.detach();
    }

    public ngOnInit(): void {

    }


    @HostListener('mousedown', ['$event'])
    public onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            this.buttonDown = true;
            this.element.style.cursor = 'crosshair';
            this.startX = ev.clientX;
            this.startY = ev.clientY;
            // 创建矩形对象。。。。。。。
            // 当框选模式时禁止其他组件改变鼠标样式
            // 鼠标缩放定位问题
            this.viewContainerRef.insert(this.rectComponent.hostView);
            ev.preventDefault();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(ev: MouseEvent): void {
        if (this.buttonDown) {
            this.endX = ev.clientX;
            this.endY = ev.clientY;
            const left = Math.min(this.endX, this.startX);
            const top = Math.min(this.endY, this.startY);
            const width = Math.abs(this.endX - this.startX)
            const height = Math.abs(this.endY - this.startY)
            console.log(`left:${left}/t,top:${top}/t,width:${width}/t,height:${height}`)
            this.rectComponent.instance.rect = { left, top, width, height };
            ev.preventDefault();
        }
    }

    @HostListener('document:mouseup', ['$event'])
    public onMouseUp(ev: MouseEvent): void {
        if (this.buttonDown && ev.button === 0) {
            this.element.style.cursor = '';
            this.buttonDown = false;
            const index = this.viewContainerRef.indexOf(this.rectComponent.hostView);
            if (index >= 0) {
                this.viewContainerRef.remove(index);
            }
            ev.preventDefault();
        }
    }

}